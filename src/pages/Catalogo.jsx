import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import TarjetaCatalogo from "../components/molecules/TarjetaCatalogo";
import { PlantillaPublica } from "../components/templates/PlantillaPublica";
import formatoPrecio from "../utils/formatoPrecio";

function Catalogo(props) {
  const navigate = useNavigate();
  const params = useParams();
  
  const nombre = params.nombre ?? '';
  const lista = props.servicios ?? [];
  const serviciosFiltrados = nombre
    ? lista.filter((s) => s.categoria.toLowerCase() === nombre.toLowerCase())
    : lista;

  const Agendar = () => {
    navigate('/agendar');
  };

  return (
    <PlantillaPublica>
      <Container className="mt-5">
        <h2 className="text-center mb-4">Catálogo de Servicios</h2>
        <Row>
          {serviciosFiltrados.map((s) => (
            <Col key={s.id} sm={12} md={4}>
              <TarjetaCatalogo
                categoria={s.categoria}
                nombre={s.nombre}
                descripcion={s.descripcion}
                precio={s.precio}
                onAgendar={Agendar}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Catalogo;