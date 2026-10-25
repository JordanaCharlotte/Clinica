import { Link, useLocation } from 'react-router-dom';
import Alerta from '../components/atoms/Alerta';
import IlustracionPlato from '../components/atoms/IlustracionPlato';
import { useAuth } from '../context/AuthContext';
import { campo, obtenerNutricionistas, obtenerServicios } from '../services/fuentesDatos';
import { formatearCLP } from '../services/reporteService';

// Los 3 pasos de "cómo funciona".
const PASOS = [
  ['Elige tu servicio', 'Revisa el catálogo y filtra por categoría o modalidad.'],
  ['Agenda tu hora', 'Escoge nutricionista, fecha y horario disponible.'],
  ['Recibe tu plan', 'Asiste a la consulta y recibe tus indicaciones por correo.'],
];

// Íconos simples en SVG para cada área de atención.
const ICONOS = {
  clinica: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />,
  deportiva: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
  vegetal: (
    <>
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z" />
      <path d="M2 21c0-3 1.9-5.4 5.1-6" />
    </>
  ),
  infantil: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
    </>
  ),
};

// Elige el ícono según la especialidad de la nutricionista.
function iconoPara(especialidad = '') {
  const texto = especialidad.toLowerCase();
  if (texto.includes('deport')) return ICONOS.deportiva;
  if (texto.includes('veget') || texto.includes('vegan')) return ICONOS.vegetal;
  if (texto.includes('infant') || texto.includes('niñ')) return ICONOS.infantil;
  return ICONOS.clinica;
}

// Home de presentación. El login está en /login.
export default function Inicio() {
  const { usuario } = useAuth();
  const location = useLocation();
  const destacados = obtenerServicios().slice(0, 3);
  const equipo = obtenerNutricionistas();

  return (
    <>
      {location.state?.mensaje && (
        <div className="container mt-3">
          <Alerta tipo="success">{location.state.mensaje}</Alerta>
        </div>
      )}

      <section className="hero-nutrivida">
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            <div className="col-12 col-lg-6 text-center text-lg-start">
              <h1 className="hero-titulo">Come mejor con un plan hecho para ti</h1>
              <p className="hero-texto">
                En NutriVida te acompañan nutricionistas que ajustan tu alimentación a tu rutina, en consulta
                presencial o por videollamada.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center justify-content-lg-start">
                <Link to="/agendar" className="btn btn-acento btn-lg">
                  Agenda tu hora
                </Link>
                <Link to="/catalogo" className="btn btn-outline-light btn-lg">
                  Ver servicios
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <figure className="hero-figura mb-0">
                <IlustracionPlato className="hero-plato" />
                <figcaption className="leyenda-plato">
                  <span><i className="punto punto-verde" aria-hidden="true" />Mitad verduras</span>
                  <span><i className="punto punto-salmon" aria-hidden="true" />Un cuarto proteína</span>
                  <span><i className="punto punto-trigo" aria-hidden="true" />Un cuarto carbohidratos</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      <section className="franja-menta">
        <div className="container">
          <div className="row align-items-center g-3">
            <div className="col-12 col-lg-8">
              <p className="mb-0 fs-5">
                Una alimentación equilibrada previene enfermedades y te da energía para tu día. Te ayudamos a
                lograrlo con indicaciones simples y seguimiento cercano.
              </p>
            </div>
            <div className="col-12 col-lg-4 d-grid gap-2">
              <Link to="/agendar" className="btn btn-primary">
                Reservar consulta presencial
              </Link>
              <Link to="/agendar" className="btn btn-oscuro">
                Reservar teleconsulta
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="h3 mb-4">¿Cómo funciona?</h2>
        <ol className="pasos list-unstyled row g-4 mb-0">
          {PASOS.map(([titulo, texto], i) => (
            <li key={titulo} className="col-12 col-md-4">
              <div className="paso h-100">
                <span className="paso-numero" aria-hidden="true">{i + 1}</span>
                <h3 className="h5 mt-3">{titulo}</h3>
                <p className="mb-0 text-body-secondary">{texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {equipo.length > 0 && (
        <section className="franja-blanca py-5">
          <div className="container">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4">
              <h2 className="h3 mb-0">Áreas de atención</h2>
              <Link to="/nutricionistas" className="enlace-seccion">
                Conoce al equipo
              </Link>
            </div>
            <div className="row g-4">
              {equipo.map((n, i) => (
                <div key={n.id ?? i} className="col-6 col-lg-3">
                  <div className="area h-100">
                    <svg className="area-icono" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {iconoPara(campo.especialidadNutricionista(n))}
                    </svg>
                    <h3 className="h6 mb-1 mt-3">{campo.especialidadNutricionista(n)}</h3>
                    <p className="small text-body-secondary mb-0">{campo.nombreNutricionista(n)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {destacados.length > 0 && (
        <section className="container py-5">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-end gap-2 mb-4">
            <h2 className="h3 mb-0">Servicios más solicitados</h2>
            <Link to="/catalogo" className="enlace-seccion">
              Ver todos los servicios
            </Link>
          </div>
          <div className="row g-4">
            {destacados.map((servicio) => (
              <div key={campo.idServicio(servicio)} className="col-12 col-md-6 col-lg-4">
                <article className="card h-100">
                  <div className="card-body d-flex flex-column">
                    <span className="badge text-bg-light align-self-start mb-2">{campo.categoriaServicio(servicio)}</span>
                    <h3 className="h5 card-title">{campo.nombreServicio(servicio)}</h3>
                    <p className="card-text text-body-secondary flex-grow-1">{campo.descripcionServicio(servicio)}</p>
                    <p className="precio-destacado mb-0">{formatearCLP(campo.precioServicio(servicio))}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="cierre-oscuro">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 text-center text-md-start">
          <div>
            <h2 className="h3 mb-1">Agenda tu primera consulta</h2>
            <p className="mb-0">Elige día y hora en menos de dos minutos.</p>
          </div>
          <div className="d-flex flex-column flex-sm-row gap-2">
            <Link to="/agendar" className="btn btn-acento btn-lg">
              Agenda tu hora
            </Link>
            {!usuario && (
              <Link to="/registro" className="btn btn-outline-light btn-lg">
                Crear cuenta
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
