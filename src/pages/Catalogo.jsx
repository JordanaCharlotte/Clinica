import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import TarjetaCatalogo from "../components/molecules/TarjetaCatalogo";
import { PlantillaPublica } from "../components/templates/PlantillaPublica";
import { useCita } from "../context/CitaContext";

function Catalogo(props) {
  const navigate = useNavigate();
  const { actualizarCita } = useCita();
  const params = useParams();

  // Si la URL es /categoria/:nombre, se muestran solo los servicios de esa categoría.
  const nombre = params.nombre ?? '';
  const lista = props.servicios ?? [];
  const serviciosFiltrados = nombre
    ? lista.filter((s) => s.categoria.toLowerCase() === nombre.toLowerCase())
    : lista;

  // Guarda el servicio elegido en la solicitud en curso y abre el formulario.
  function agendar(id) {
    actualizarCita({ servicioId: id });
    navigate('/agendar');
  }

  return (
    <PlantillaPublica>
      <Container className="mt-5">
        <h2 className="text-center mb-4">Catálogo de Servicios</h2>
        <Row>
          {serviciosFiltrados.map((s) => (
            <Col key={s.id} sm={12} md={4} className="mb-4">
              <TarjetaCatalogo
                categoria={s.categoria}
                nombre={s.nombre}
                descripcion={s.descripcion}
                precio={s.precio}
                onAgendar={() => agendar(s.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;
