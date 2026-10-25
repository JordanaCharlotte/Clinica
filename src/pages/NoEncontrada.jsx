import { Link } from 'react-router-dom';

// Se muestra cuando la URL no coincide con ninguna ruta de App.jsx.
export default function NoEncontrada() {
  return (
    <section className="container py-5 text-center">
      <p className="display-1 fw-bold text-primary mb-0">404</p>
      <h1 className="h3">Esta página no existe o todavía está en construcción</h1>
      <p className="text-body-secondary">Revisa el enlace o vuelve al inicio para seguir navegando.</p>
      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
        <Link to="/" className="btn btn-primary">
          Ir al inicio
        </Link>
        <Link to="/contacto" className="btn btn-outline-primary">
          Contactar a la clínica
        </Link>
      </div>
    </section>
  );
}
