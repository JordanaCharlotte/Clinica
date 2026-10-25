// Servicio de usuarios y sesión.
// Mientras no exista backend (Evaluación 3), los datos viven en localStorage.
// Ningún método devuelve la contraseña hacia los componentes.

import usuariosIniciales from '../data/usuarios';
import { formatearRun, limpiarRun } from '../utils/validaciones';

export const CLAVE_USUARIOS = 'clinica_usuarios';
export const CLAVE_SESION = 'clinica_sesion';

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

// Lista completa (con contraseñas), solo para uso interno del servicio.
function leerUsuarios() {
  const guardados = leer(CLAVE_USUARIOS, null);
  if (Array.isArray(guardados)) return guardados;
  guardar(CLAVE_USUARIOS, usuariosIniciales);
  return [...usuariosIniciales];
}

// Devuelve una copia del usuario sin la contraseña, para no mandarla a las páginas.
function sinPassword(usuario) {
  if (!usuario) return null;
  const { password: _omitida, ...resto } = usuario;
  return resto;
}

// Limpia los datos antes de guardar: RUN con formato, correo en minúscula, sin espacios de más.
function normalizar(datos) {
  return {
    ...datos,
    run: formatearRun(datos.run ?? ''),
    nombre: String(datos.nombre ?? '').trim(),
    apellidos: String(datos.apellidos ?? '').trim(),
    correo: String(datos.correo ?? '').trim().toLowerCase(),
    telefono: String(datos.telefono ?? '').replace(/\s/g, ''),
  };
}

// ---------- Usuarios (CRUD del admin) ----------

// Lista de usuarios para el admin (sin contraseñas).
export function obtenerUsuarios() {
  return leerUsuarios().map(sinPassword);
}

// Busca un usuario por su id (se compara como texto porque en la URL llega como string).
export function obtenerUsuarioPorId(id) {
  return sinPassword(leerUsuarios().find((u) => String(u.id) === String(id)));
}

// Revisa si el correo ya está usado. excluirId sirve al editar, para no chocar consigo mismo.
export function existeCorreo(correo, excluirId = null) {
  const buscado = String(correo ?? '').trim().toLowerCase();
  return leerUsuarios().some(
    (u) => u.correo === buscado && String(u.id) !== String(excluirId),
  );
}

// Igual que existeCorreo, pero con el RUN.
export function existeRun(run, excluirId = null) {
  const buscado = limpiarRun(run);
  return leerUsuarios().some(
    (u) => limpiarRun(u.run) === buscado && String(u.id) !== String(excluirId),
  );
}

// Crea un usuario nuevo. El id es el mayor que exista + 1.
// Devuelve { ok, usuario } o { ok: false, error, campo } para marcar el campo con problema.
export function crearUsuario(datos) {
  const usuarios = leerUsuarios();
  const nuevo = normalizar(datos);
  if (existeCorreo(nuevo.correo)) return { ok: false, error: 'Ya existe una cuenta con ese correo.', campo: 'correo' };
  if (existeRun(nuevo.run)) return { ok: false, error: 'Ya existe una cuenta con ese RUN.', campo: 'run' };

  const id = usuarios.reduce((max, u) => Math.max(max, Number(u.id) || 0), 0) + 1;
  const usuario = {
    id,
    run: nuevo.run,
    nombre: nuevo.nombre,
    apellidos: nuevo.apellidos,
    correo: nuevo.correo,
    telefono: nuevo.telefono,
    password: datos.password,
    rol: datos.rol === 'admin' ? 'admin' : 'cliente',
  };
  guardar(CLAVE_USUARIOS, [...usuarios, usuario]);
  return { ok: true, usuario: sinPassword(usuario) };
}

// Registro público: siempre crea clientes, aunque alguien intente mandar rol admin.
export function registrarUsuario(datos) {
  return crearUsuario({ ...datos, rol: 'cliente' });
}

// Edita un usuario existente y guarda la lista completa de nuevo.
export function actualizarUsuario(id, cambios) {
  const usuarios = leerUsuarios();
  const indice = usuarios.findIndex((u) => String(u.id) === String(id));
  if (indice === -1) return { ok: false, error: 'El usuario no existe.' };

  const actual = usuarios[indice];
  const datos = normalizar({ ...actual, ...cambios });
  if (existeCorreo(datos.correo, id)) return { ok: false, error: 'Ya existe una cuenta con ese correo.', campo: 'correo' };
  if (existeRun(datos.run, id)) return { ok: false, error: 'Ya existe una cuenta con ese RUN.', campo: 'run' };

  const actualizado = {
    ...actual,
    run: datos.run,
    nombre: datos.nombre,
    apellidos: datos.apellidos,
    correo: datos.correo,
    telefono: datos.telefono,
    rol: cambios.rol ? (cambios.rol === 'admin' ? 'admin' : 'cliente') : actual.rol,
    // Contraseña vacía = mantener la actual.
    password: cambios.password ? cambios.password : actual.password,
  };
  usuarios[indice] = actualizado;
  guardar(CLAVE_USUARIOS, usuarios);

  // Si se editó a quien tiene la sesión abierta, se refresca la sesión.
  const sesion = obtenerSesion();
  if (sesion && String(sesion.id) === String(id)) guardarSesion(actualizado);

  return { ok: true, usuario: sinPassword(actualizado) };
}

// Borra un usuario, pero no deja borrar al único administrador.
export function eliminarUsuario(id) {
  const usuarios = leerUsuarios();
  const usuario = usuarios.find((u) => String(u.id) === String(id));
  if (!usuario) return { ok: false, error: 'El usuario no existe.' };
  const admins = usuarios.filter((u) => u.rol === 'admin');
  if (usuario.rol === 'admin' && admins.length === 1) {
    return { ok: false, error: 'No puedes eliminar al único administrador.' };
  }
  guardar(CLAVE_USUARIOS, usuarios.filter((u) => String(u.id) !== String(id)));
  return { ok: true };
}

// ---------- Sesión ----------

// Guarda en la sesión solo los datos necesarios (sin contraseña).
function guardarSesion(usuario) {
  const { id, nombre, apellidos, correo, rol, run, telefono } = usuario;
  const sesion = { id, nombre, apellidos, correo, rol, run, telefono };
  guardar(CLAVE_SESION, sesion);
  return sesion;
}

// Busca el usuario por correo y compara la contraseña.
export function iniciarSesion(correo, password) {
  const buscado = String(correo ?? '').trim().toLowerCase();
  const usuario = leerUsuarios().find((u) => u.correo === buscado);
  // Mismo mensaje para correo o contraseña incorrectos: no revela qué correos existen.
  if (!usuario || usuario.password !== password) {
    return { ok: false, error: 'Correo o contraseña incorrectos.' };
  }
  return { ok: true, usuario: guardarSesion(usuario) };
}

// Borra la sesión guardada.
export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}

// Devuelve el usuario con sesión abierta o null.
export function obtenerSesion() {
  return leer(CLAVE_SESION, null);
}

// true si el usuario tiene rol admin.
export function esAdmin(usuario = obtenerSesion()) {
  return usuario?.rol === 'admin';
}
