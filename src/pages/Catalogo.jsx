import { Container, Row, Col } from "react-bootstrap";

function Catalogo(props) {
  function alAgendar(nombre) {
    alert(`Agendando servicio: ${nombre}`);
  }
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Catálogo de Servicios</h2>
      <Row>
        {props.servicios && props.servicios.map((s) => (
          <Col key={s.id} sm={12} md={4}>
            {/*Cambiar este div feo por su componente <Tarjeta> */}
            {/*Pasarle a la Tarjeta los props (nombre, especie, onSeguir) */}
            <div className="border p-2 mb-3">
              <p>{s.nombre}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}