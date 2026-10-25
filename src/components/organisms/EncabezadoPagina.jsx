import { Link, matchPath, useLocation } from 'react-router-dom';

// Franja de título para las páginas interiores, con el mismo estilo del Home.
// Se elige según la ruta, así las páginas de todo el equipo quedan iguales sin
// tener que modificarlas una por una.
// ocultarTituloInterno: esconde el <h2> que la página ya traía, para no repetirlo.
const ENCABEZADOS = [
  {
    ruta: '/catalogo',
    titulo: 'Servicios y precios',
    bajada: 'Consultas, planes y evaluaciones para cada etapa de tu vida.',
    ocultarTituloInterno: true,
  },
  {
    ruta: '/categoria/:nombre',
    titulo: (p) => `Servicios: ${decodeURIComponent(p.nombre)}`,
    bajada: 'Estos son los servicios de la categoría que elegiste.',
    ocultarTituloInterno: true,
  },
  {
    ruta: '/nutricionistas',
    titulo: 'Nuestro equipo',
    bajada: 'Elige con quién quieres atenderte. Cada especialista te acompaña en todo tu proceso.',
    ocultarTituloInterno: true,
  },
  {
    ruta: '/agendar',
    titulo: 'Solicita tu cita',
    bajada: 'Elige el servicio, tu nutricionista y el horario que te acomode.',
  },
  {
    ruta: '/confirmacion',
    titulo: 'Confirma tu cita',
    bajada: 'Revisa los datos antes de enviar tu solicitud.',
  },
  {
    ruta: '/nosotros',
    titulo: 'Sobre NutriVida',
    bajada:
      'Acompañamos a las personas a mejorar su alimentación con planes realistas, seguimiento cercano y atención presencial u online.',
  },
  {
    ruta: '/blog',
    titulo: 'Blog',
    bajada: 'Consejos de nuestro equipo para comer mejor en el día a día.',
  },
  {
    ruta: '/contacto',
    titulo: 'Contacto',
    bajada: '¿Tienes dudas sobre nuestros servicios? Escríbenos y te respondemos en 48 horas hábiles.',
  },
  {
    ruta: '/login',
    titulo: 'Iniciar sesión',
    bajada: 'Ingresa para agendar más rápido y revisar tus citas.',
  },
  {
    ruta: '/registro',
    titulo: 'Crear cuenta',
    bajada: 'Con tu cuenta, la confirmación de cita se completa sola con tus datos.',
  },
];

// Recorre la lista y muestra la franja de la primera ruta que coincide con la URL actual.
// Si ninguna coincide (ej: el Home), no muestra nada.
export default function EncabezadoPagina() {
  const { pathname } = useLocation();

  for (const e of ENCABEZADOS) {
    const coincide = matchPath(e.ruta, pathname);
    if (!coincide) continue;
    const titulo = typeof e.titulo === 'function' ? e.titulo(coincide.params) : e.titulo;
    return (
      <section className={`encabezado-pagina${e.ocultarTituloInterno ? ' oculta-titulo' : ''}`}>
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {titulo}
              </li>
            </ol>
          </nav>
          <h1 className="encabezado-titulo">{titulo}</h1>
          {e.bajada && <p className="encabezado-bajada">{e.bajada}</p>}
        </div>
      </section>
    );
  }
  return null;
}
