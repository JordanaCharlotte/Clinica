// Contexto de sesión: guarda quién está conectado y lo comparte con toda la app.
// Cualquier componente puede usar useAuth() para saber el usuario, su rol o cerrar sesión.
import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // La sesión se lee una vez desde localStorage al montar la app.
  const [usuario, setUsuario] = useState(() => authService.obtenerSesion());

  // Inicia sesión y, si sale bien, actualiza el estado para que el Navbar cambie.
  const login = useCallback((correo, password) => {
    const resultado = authService.iniciarSesion(correo, password);
    if (resultado.ok) setUsuario(resultado.usuario);
    return resultado;
  }, []);

  // Crea la cuenta (siempre como cliente).
  const registrar = useCallback((datos) => {
    const resultado = authService.registrarUsuario(datos);
    if (resultado.ok) {
      // Tras registrarse, la persona queda con la sesión iniciada.
      const sesion = authService.iniciarSesion(datos.correo, datos.password);
      if (sesion.ok) setUsuario(sesion.usuario);
    }
    return resultado;
  }, []);

  // Cierra la sesión y deja el usuario en null.
  const logout = useCallback(() => {
    authService.cerrarSesion();
    setUsuario(null);
  }, []);

  const actualizarPerfil = useCallback(
    (cambios) => {
      if (!usuario) return { ok: false, error: 'No hay sesión iniciada.' };
      // Desde el perfil no se puede cambiar el rol propio.
      const { rol: _rol, ...permitidos } = cambios;
      const resultado = authService.actualizarUsuario(usuario.id, permitidos);
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
export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error('useAuth debe usarse dentro de <AuthProvider>.');
  return contexto;
}

export default AuthContext;
