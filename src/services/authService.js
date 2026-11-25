// Servicio de usuarios y sesión.
// Evaluación 3: los usuarios viven en el backend (PostgreSQL en AWS RDS) y se consultan por la API REST.
// En localStorage solo se guardan la sesión (datos básicos, sin contraseña) y el token JWT.
// Ningún método devuelve la contraseña hacia los componentes.

import { api } from './api';

export const CLAVE_SESION = 'clinica_sesion';
export const CLAVE_TOKEN = 'token';

// Lee una clave de localStorage y la convierte de texto JSON a objeto.
function leer(clave, valorPorDefecto) {
  try {
    const crudo = localStorage.getItem(clave);
    return crudo ? JSON.parse(crudo) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

// Guarda un valor en localStorage como texto JSON.
function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

// Convierte un error de axios en { ok: false, error, campo, estado } para mostrarlo en los formularios.
function errorDeApi(error, mensajePorDefecto) {
  if (!error?.response) {
    return { ok: false, error: 'No fue posible conectar con el backend.', estado: 0 };
  }
  const estado = error.response.status;
  const datos = error.response.data ?? {};
  // El backend responde 400 con { errores } cuando falla una validación.
  if (datos.errores) {
    if (Array.isArray(datos.errores)) {
      const primero = datos.errores[0];
      const mensaje = typeof primero === 'string' ? primero : primero?.mensaje ?? primero?.error;
      return { ok: false, error: mensaje ?? mensajePorDefecto, campo: primero?.campo, estado };
    }
    const [campo, mensaje] = Object.entries(datos.errores)[0] ?? [];
    return { ok: false, error: mensaje ?? mensajePorDefecto, campo, estado };
  }
  return { ok: false, error: datos.error ?? mensajePorDefecto, campo: datos.campo, estado };
}

// Si el backend responde 401 a una petición que llevaba token (vencido o inválido),
// se borra la sesión y se manda al login. Así no queda una sesión "fantasma" en el navegador.
api.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    const llevabaToken = Boolean(error.config?.headers?.Authorization);
    const esValidacionInicial = String(error.config?.url ?? '').includes('/auth/me');
    if (error.response?.status === 401 && llevabaToken && !esValidacionInicial) {
      cerrarSesion();
      if (window.location.pathname !== '/login') window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);

// ---------- Usuarios (CRUD del admin, contra la API) ----------

// GET /api/usuarios (solo admin). Devuelve la lista, o [] si algo falla.
export async function obtenerUsuarios() {
  try {
    const respuesta = await api.get('/usuarios');
    return Array.isArray(respuesta.data) ? respuesta.data : [];
  } catch (error) {
    console.error('No se pudo cargar la lista de usuarios:', errorDeApi(error, '').error);
    return [];
  }
}

// El backend no tiene GET /usuarios/:id, así que se busca dentro de la lista.
export async function obtenerUsuarioPorId(id) {
  const usuarios = await obtenerUsuarios();
  return usuarios.find((u) => String(u.id) === String(id)) ?? null;
}

// Registro público: POST /api/auth/register. El backend siempre lo crea como cliente,
// guarda la contraseña con bcrypt y devuelve el usuario y su token, así queda con la sesión iniciada.
export async function registrarUsuario(datos) {
  try {
    const respuesta = await api.post('/auth/register', datos);
    const { usuario, token } = respuesta.data;
    localStorage.setItem(CLAVE_TOKEN, token);
    return { ok: true, usuario: guardarSesion(usuario), token };
  } catch (error) {
    return errorDeApi(error, 'No se pudo crear la cuenta.');
  }
}

// El admin crea un usuario: POST /auth/register sin guardar el token (la sesión sigue siendo la del admin).
// Si se pidió rol admin, se asigna después con PUT /usuarios/:id.
export async function crearUsuario(datos) {
  try {
    const respuesta = await api.post('/auth/register', datos);
    let usuario = respuesta.data.usuario;
    if (datos.rol === 'admin') {
      const cambio = await api.put('/usuarios/' + usuario.id, { ...usuario, rol: 'admin' });
      usuario = cambio.data;
    }
    return { ok: true, usuario };
  } catch (error) {
    return errorDeApi(error, 'No se pudo crear el usuario.');
  }
}

// PUT /api/usuarios/:id (solo admin). Contraseña vacía = mantener la actual.
export async function actualizarUsuario(id, cambios) {
  const datos = { ...cambios };
  if (!datos.password) delete datos.password;
  try {
    const respuesta = await api.put('/usuarios/' + id, datos);
    const usuario = respuesta.data;
    // Si se editó a quien tiene la sesión abierta, se refresca la sesión.
    const sesion = obtenerSesion();
    if (sesion && String(sesion.id) === String(id)) guardarSesion(usuario);
    return { ok: true, usuario };
  } catch (error) {
    return errorDeApi(error, 'No se pudieron guardar los cambios.');
  }
}

// DELETE /api/usuarios/:id (solo admin). El backend no deja borrar al único administrador.
export async function eliminarUsuario(id) {
  try {
    await api.delete('/usuarios/' + id);
    return { ok: true };
  } catch (error) {
    return errorDeApi(error, 'No se pudo eliminar el usuario.');
  }
}

// ---------- Sesión ----------

// Guarda en la sesión solo los datos necesarios (sin contraseña).
function guardarSesion(usuario) {
  const { id, nombre, apellidos, correo, rol, run, telefono } = usuario;
  const sesion = { id, nombre, apellidos, correo, rol, run, telefono };
  guardar(CLAVE_SESION, sesion);
  return sesion;
}

// POST /api/auth/login: devuelve el usuario y el token JWT.
export async function iniciarSesion(correo, password) {
  try {
    const respuesta = await api.post('/auth/login', { correo, password });
    const datos = respuesta.data;
    const sesion = guardarSesion(datos.usuario);
    localStorage.setItem(CLAVE_TOKEN, datos.token);
    return { ok: true, usuario: sesion, token: datos.token };
  } catch (error) {
    if (error.response) {
      return { ok: false, error: error.response.data.error || 'Correo o contraseña incorrectos.' };
    }
    return { ok: false, error: 'No fue posible conectar con el backend.' };
  }
}

// GET /api/auth/me: confirma con el backend que el token sigue siendo válido (se usa al recargar).
export async function obtenerUsuarioActual() {
  try {
    const respuesta = await api.get('/auth/me');
    return { ok: true, usuario: guardarSesion(respuesta.data) };
  } catch (error) {
    return errorDeApi(error, 'La sesión no es válida.');
  }
}

// Borra la sesión y el token.
export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
  localStorage.removeItem(CLAVE_TOKEN);
}

// Devuelve el usuario con sesión abierta o null. Sin token no hay sesión.
export function obtenerSesion() {
  if (!localStorage.getItem(CLAVE_TOKEN)) return null;
  return leer(CLAVE_SESION, null);
}

// true si el usuario tiene rol admin.
export function esAdmin(usuario = obtenerSesion()) {
  return usuario?.rol === 'admin';
}
