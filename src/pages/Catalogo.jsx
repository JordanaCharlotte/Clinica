import { Container, Row, Col } from "react-bootstrap";

function Catalogo(props) {
  //Crear aquí la función alAgendar(nombre)

  return (
    <Container className="mt-5">
      {/*Agregar el título h2 de "Catálogo de Servicios" aquí */}
      
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