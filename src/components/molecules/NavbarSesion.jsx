import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Parte derecha del Navbar: botones de sesión.
// Se inserta dentro del Navbar existente: <NavbarSesion />
export default function NavbarSesion() {
  const { usuario, esAdmin, logout } = useAuth();
  const navigate = useNavigate();

  // Cierra sesión y vuelve al inicio.
  function salir() {
    logout();
    navigate('/');
  }

  // Sin sesión: botones para entrar o registrarse.
  if (!usuario) {
    return (
      <div className="d-flex flex-column flex-lg-row gap-2 mt-2 mt-lg-0">
        <Link to="/login" className="btn btn-outline-light btn-sm">
          Iniciar sesión
        </Link>
        <Link to="/registro" className="btn btn-light btn-sm">
          Crear cuenta
        </Link>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-2 mt-lg-0">
      <span className="small text-white-50">Hola, {usuario.nombre}</span>
      {esAdmin && (
        <Link to="/admin" className="btn btn-outline-light btn-sm">
          Panel admin
        </Link>
      )}
      <button type="button" className="btn btn-outline-light btn-sm" onClick={salir}>
        Cerrar sesión
      </button>
    </div>
  );
}
