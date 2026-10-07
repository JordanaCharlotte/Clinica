import Container from 'react-bootstrap/Container';

function Footer(props) {
  const anio = props.anio || new Date().getFullYear();
  const texto = props.texto || "Todos los derechos reservados.";

  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <p className="mb-0 small">
          © {anio} — {texto}
        </p>
      </Container>
    </footer>
  );
}

export default Footer;