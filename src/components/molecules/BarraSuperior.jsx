import { Link } from 'react-router-dom';

// Franja superior con los datos de contacto y el acceso directo para agendar.
// En celular se muestran solo el teléfono y el botón.
export default function BarraSuperior() {
  return (
    <div className="barra-superior">
      <div className="container d-flex align-items-center justify-content-between gap-3">
        <p className="mb-0 d-none d-md-block">Atención de lunes a viernes, de 9:00 a 19:00</p>
        <div className="d-flex align-items-center gap-3 ms-auto">
          <a href="mailto:contacto@nutrivida.cl" className="d-none d-lg-inline">
            contacto@nutrivida.cl
          </a>
          <a href="tel:+56222223333">+56 2 2222 3333</a>
          <Link to="/agendar" className="btn btn-acento btn-sm">
            Agenda tu hora
          </Link>
        </div>
      </div>
    </div>
  );
}
