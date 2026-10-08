import { Container, Row, Col } from "react-bootstrap";
import TarjetaCatalogo from "../components/molecules/TarjetaCatalogo";

function Catalogo(props) {
  //Crear aquí la función alAgendar(nombre)

  return (
    <Container className="mt-5">
      {/*Agregar el título h2 de "Catálogo de Servicios" aquí */}
      
      <Row>
        {props.servicios && props.servicios.map((s) => (
          <Col key={s.id} sm={12} md={4}>
            {/*Cambiar este div feo por su componente <Tarjeta> */}
            <TarjetaCatalogo
              categoria={s.categoria}
              nombre={s.nombre}
              descripcion={s.descripcion}
              precio={s.precio}
              onAgendar={() => console.log(s.nombre)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Catalogo;