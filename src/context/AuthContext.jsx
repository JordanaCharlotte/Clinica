// Contexto de sesión: guarda quién está conectado y lo comparte con toda la app.
// Cualquier componente puede usar useAuth() para saber el usuario, su rol o cerrar sesión.
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // La sesión se lee desde localStorage al montar la app (persiste aunque se recargue la página).
  const [usuario, setUsuario] = useState(() => authService.obtenerSesion());

  // Al recargar, se confirma con el backend (GET /auth/me) que el token siga siendo válido.
  // Si el token venció o el usuario ya no existe, se cierra la sesión.
  useEffect(() => {
    if (!authService.obtenerSesion()) return undefined;
    let activo = true;
    authService.obtenerUsuarioActual().then((resultado) => {
      if (!activo) return;
      if (resultado.ok) setUsuario(resultado.usuario);
      else if (resultado.estado === 401 || resultado.estado === 404) {
        authService.cerrarSesion();
        setUsuario(null);
      }
    });
    return () => {
      activo = false;
    };
  }, []);

  // Inicia sesión y, si sale bien, actualiza el estado para que el Navbar cambie.
  const login = useCallback(async (correo, password) => {
    const resultado = await authService.iniciarSesion(correo, password);
    if (resultado.ok) setUsuario(resultado.usuario);
    return resultado;
  }, []);

  // Crea la cuenta (siempre como cliente). El backend devuelve el token: queda con la sesión iniciada.
  const registrar = useCallback(async (datos) => {
    const resultado = await authService.registrarUsuario(datos);
    if (resultado.ok) setUsuario(resultado.usuario);
    return resultado;
  }, []);

  // Cierra la sesión (borra sesión y token) y deja el usuario en null.
  const logout = useCallback(() => {
    authService.cerrarSesion();
    setUsuario(null);
  }, []);

  const actualizarPerfil = useCallback(
    async (cambios) => {
      if (!usuario) return { ok: false, error: 'No hay sesión iniciada.' };
      // Desde el perfil no se puede cambiar el rol propio: se manda el rol actual.
      const { rol: _rol, ...permitidos } = cambios;
      const resultado = await authService.actualizarUsuario(usuario.id, { ...usuario, ...permitidos, rol: usuario.rol });
      if (resultado.ok) setUsuario(authService.obtenerSesion());
      return resultado;
    },
    [usuario],
  );

  // Todo lo que se comparte. useMemo evita que se vuelva a crear en cada render.
  const valor = useMemo(
    () => ({
      usuario,
      estaAutenticado: Boolean(usuario),
      esAdmin: usuario?.rol === 'admin',
      login,
      registrar,
      logout,
      actualizarPerfil,
    }),
    [usuario, login, registrar, logout, actualizarPerfil],
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

// Hook para leer el contexto. Avisa si se usa fuera del AuthProvider.
const SIN_SESION = {
  usuario: null,
  estaAutenticado: false,
  esAdmin: false,
  login: async () => ({ ok: false, error: 'No hay AuthProvider.' }),
  registrar: async () => ({ ok: false, error: 'No hay AuthProvider.' }),
  logout: () => {},
  actualizarPerfil: async () => ({ ok: false, error: 'No hay AuthProvider.' }),
};

export function useAuth() {
  const contexto = useContext(AuthContext);
  // Fuera del AuthProvider (por ejemplo, en pruebas de otros componentes)
  // se responde "sin sesión" en vez de romper la página.
  return contexto ?? SIN_SESION;
}

export default AuthContext;
