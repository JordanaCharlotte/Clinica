import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Menú del panel. Las rutas de Davis y Vicente están aquí para que todo el
// admin comparta el mismo layout; si usan otra URL, cambiarla en esta lista.
// Descomentar cada enlace cuando exista su página en App.jsx.
const ENLACES = [
  { to: '/admin', texto: 'Dashboard', exacto: true },
  // { to: '/admin/catalogo', texto: 'Catálogo' },        // Davis
  // { to: '/admin/categorias', texto: 'Categorías' },    // Davis
  // { to: '/admin/criticos', texto: 'Ítems críticos' },  // Davis
  // { to: '/admin/solicitudes', texto: 'Solicitudes' },  // Vicente
  { to: '/admin/usuarios', texto: 'Usuarios' },
  { to: '/admin/reportes', texto: 'Reportes' },
  { to: '/admin/perfil', texto: 'Mi perfil' },
];

// Estructura del panel: barra de arriba, menú lateral y el contenido en <Outlet />.
// En celular el menú se abre y cierra con el botón "Menú".
export default function PlantillaAdmin() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  function salir() {
    logout();
    navigate('/');
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <header className="navbar bg-dark navbar-dark px-3">
        <Link to="/admin" className="navbar-brand">
          NutriVida · Admin
        </Link>
        <div className="d-flex align-items-center gap-2">
          <span className="text-white-50 small d-none d-sm-inline">{usuario?.nombre}</span>
          <Link to="/" className="btn btn-outline-light btn-sm">
            Ver sitio
          </Link>
          <button type="button" className="btn btn-outline-light btn-sm" onClick={salir}>
            Salir
          </button>
          <button
            type="button"
            className="btn btn-outline-light btn-sm d-lg-none"
            aria-expanded={menuAbierto}
            aria-controls="menu-admin"
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            Menú
          </button>
        </div>
      </header>

      <div className="container-fluid flex-grow-1">
        <div className="row h-100">
          <nav
            id="menu-admin"
            aria-label="Menú del panel"
            className={`col-12 col-lg-2 bg-body-tertiary border-end py-3 ${menuAbierto ? 'd-block' : 'd-none'} d-lg-block`}
          >
            <ul className="nav nav-pills flex-column gap-1">
              {ENLACES.map((e) => (
                <li key={e.to} className="nav-item">
                  <NavLink
                    to={e.to}
                    end={e.exacto}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : 'link-body-emphasis'}`}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {e.texto}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <main className="col-12 col-lg-10 py-4 px-3 px-lg-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
