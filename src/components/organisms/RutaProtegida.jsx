import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Protege rutas. Sin sesión → /login (y luego vuelve a donde iba).
// Con rol="admin" y sesión de cliente → al inicio.
// Se usa como ruta padre: <Route element={<RutaProtegida rol="admin" />}>...</Route>
export default function RutaProtegida({ rol, children }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  if (rol && usuario.rol !== rol) return <Navigate to="/" replace />;

  return children ?? <Outlet />;
}
