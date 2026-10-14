import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import TarjetaCatalogo from "../components/molecules/TarjetaCatalogo";

function Catalogo({ servicios }) {
  // useParams me permite leer el parametro que viene en la URL
  // ejemplo: /categoria/nutricion -> nombre = "nutricion"
  const { nombre } = useParams();

  // Si hay una categoria en la URL, filtro el arreglo de servicios
  // Si no hay categoria (nombre es undefined), muestro todos los servicios
  let serviciosMostrados = servicios;

  if (nombre) {
    serviciosMostrados = servicios.filter(
      (servicio) => servicio.categoria.toLowerCase() === nombre.toLowerCase()
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: "var(--text-h)" }}>
        Catálogo de Servicios
      </h2>

      {/* Si no hay resultados para esa categoria, muestra un mensaje */}
      {serviciosMostrados.length === 0 ? (
        <p className="text-center">No hay servicios en esta categoría.</p>
      ) : (
        <Row>
          {serviciosMostrados.map((servicio) => (
            <Col md={4} className="mb-4" key={servicio.id}>
              <TarjetaCatalogo
                categoria={servicio.categoria}
                nombre={servicio.nombre}
                descripcion={servicio.descripcion}
                precio={servicio.precio}
                onAgendar={() => console.log("Agendando:", servicio.nombre)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Catalogo;