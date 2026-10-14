import Container from 'react-bootstrap/Container';

function Footer(props) {
  const anio = props.anio || new Date().getFullYear();
  const texto = props.texto || "Todos los derechos reservados.";


  function ir(evento, ruta) {
    evento.preventDefault();
    props.onNavegar(ruta);
  }

  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <Container>
        <p className="mb-2">
          <a href="/" onClick={(e) => ir(e, '/')} className="text-white me-3">Inicio</a>
          <a href="/catalogo" onClick={(e) => ir(e, '/catalogo')} className="text-white">Catálogo</a>
        </p>
        <p className="mb-0 small">
          © {anio} — {texto}
        </p>
      </Container>
    </footer>
  );
}

export default Footer;