// Página /nosotros: quiénes somos, valores y equipo de nutricionistas.
import { campo, obtenerNutricionistas } from '../services/fuentesDatos';

// Valores de la clínica que se muestran en tarjetas.
const VALORES = [
  ['Evidencia', 'Nuestras indicaciones se basan en guías clínicas actualizadas.'],
  ['Cercanía', 'Escuchamos tu historia y adaptamos el plan a tu rutina.'],
  ['Acceso', 'Atención presencial y teleconsulta para que la distancia no sea un obstáculo.'],
];

// Saca las iniciales del nombre para el círculo de la foto (ej: "Ana Rojas" -> "AR").
function iniciales(nombre) {
  return nombre
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join('');
}

export default function Nosotros() {
  const equipo = obtenerNutricionistas();

  return (
    <>
      <section className="container py-5">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <div className="h-100 p-4 rounded-4 bg-body-tertiary">
              <h2 className="h4">Misión</h2>
              <p className="mb-0">
                Entregar atención nutricional de calidad, accesible y basada en evidencia, que ayude a cada paciente
                a sostener hábitos saludables en el tiempo.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="h-100 p-4 rounded-4 bg-body-tertiary">
              <h2 className="h4">Visión</h2>
              <p className="mb-0">
                Ser la clínica de nutrición de referencia en atención integral, presencial y remota, para personas
                de todas las edades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-5">
        <h2 className="h3 text-center mb-4">Nuestros valores</h2>
        <div className="row g-4">
          {VALORES.map(([titulo, texto]) => (
            <div key={titulo} className="col-12 col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <h3 className="h5">{titulo}</h3>
                  <p className="card-text text-body-secondary">{texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {equipo.length > 0 && (
        <section className="bg-body-tertiary py-5">
          <div className="container">
            <h2 className="h3 text-center mb-4">Nuestro equipo</h2>
            <div className="row g-4">
              {equipo.map((n, i) => {
                const nombre = campo.nombreNutricionista(n);
                return (
                  <div key={n.id ?? i} className="col-12 col-sm-6 col-lg-3">
                    <div className="card h-100 text-center shadow-sm">
                      <div className="card-body">
                        <div
                          className="rounded-circle bg-primary-subtle text-primary-emphasis d-inline-flex align-items-center justify-content-center fw-bold mb-3"
                          style={{ width: 72, height: 72 }}
                          aria-hidden="true"
                        >
                          {iniciales(nombre)}
                        </div>
                        <h3 className="h6 mb-1">{nombre}</h3>
                        <p className="small text-body-secondary mb-0">{campo.especialidadNutricionista(n)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
