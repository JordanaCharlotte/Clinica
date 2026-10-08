import { Container, Row, Col } from "react-bootstrap";
import LoginTemplate from '../components/templates/LoginTemplate';
import LoginForm from '../components/organisms/LoginForm';

function Inicio() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          {/*Agregar un título de bienvenida aquí */}
          <h2 
            className="text-center mb-3" 
            style={{ color: "var(--text-h)", fontWeight: "bold" }}
          >
            Bienvenido a <span style={{ color: "var(--accent)" }}>NutriVida</span>
          </h2>

          {/*Agregar textos descriptivos o cambiar los colores/sombras */}
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
  );
}

export default Inicio;