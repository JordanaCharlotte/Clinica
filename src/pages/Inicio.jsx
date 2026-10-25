import { Container, Row, Col } from "react-bootstrap";
import LoginTemplate from '../components/templates/LoginTemplate';
import LoginForm from '../components/organisms/LoginForm';
import { PlantillaPublica } from '../components/templates/PlantillaPublica';

function Inicio() {
  return (
    <PlantillaPublica>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 
              className="text-center mb-3" 
              style={{ color: "var(--text-h)"}}
            >
              Bienvenido a <span style={{ color: "var(--accent)" }}>NutriVida</span>
            </h2>

            <p 
              className="text-center mb-4" 
              style={{ color: "var(--text)" }}
            >
              Inicia sesión para agendar tus consultas, dar seguimiento a tu bienestar 
              y acceder a nuestros servicios personalizados de nutrición.
            </p>

            <LoginTemplate>
              <LoginForm />
            </LoginTemplate>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Inicio;