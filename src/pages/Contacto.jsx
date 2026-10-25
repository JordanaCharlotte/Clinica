// Página /contacto: datos de la clínica y formulario.
import ContactoForm from '../components/organisms/ContactoForm';

const CLAVE_MENSAJES = 'clinica_mensajes';

// Guarda el mensaje en localStorage junto con un id y la fecha, porque aún no hay backend.
function guardarMensaje(datos) {
  try {
    const anteriores = JSON.parse(localStorage.getItem(CLAVE_MENSAJES) ?? '[]');
    localStorage.setItem(
      CLAVE_MENSAJES,
      JSON.stringify([...anteriores, { ...datos, id: Date.now(), fecha: new Date().toISOString() }]),
    );
  } catch {
    // Si localStorage falla, el mensaje igual se muestra como enviado en esta versión sin backend.
  }
}

export default function Contacto() {
  return (
    <section className="container py-5">
      <div className="row g-5">
        <div className="col-12 col-lg-5">
          <h2 className="h4 mb-3">Datos de contacto</h2>
          <ul className="list-unstyled">
            <li className="mb-2">
              <strong>Correo:</strong> <a href="mailto:contacto@nutrivida.cl">contacto@nutrivida.cl</a>
            </li>
            <li className="mb-2">
              <strong>Teléfono:</strong> <a href="tel:+56222223333">+56 2 2222 3333</a>
            </li>
            <li className="mb-2">
              <strong>Horario:</strong> lunes a viernes, de 9:00 a 19:00
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <ContactoForm onEnviar={guardarMensaje} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
