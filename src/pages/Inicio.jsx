import { Container, Row, Col } from "react-bootstrap";
import LoginTemplate from '../components/templates/LoginTemplate';
import LoginForm from '../components/organisms/LoginForm';

function Inicio() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center">Bienvenido a la Clínica</h1>
          {/*Agregar textos descriptivos o cambiar los colores/sombras */}
          
          <LoginTemplate>
            <LoginForm />
          </LoginTemplate>
        </Col>
      </Row>
    </Container>
  );
}

export default Inicio;
