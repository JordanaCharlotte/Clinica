import NavbarBS from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Navbar(props) {
  const marca = props.marca || "Mi Aplicación";
  const variante = props.variante || "dark";
  const bg = props.bg || "primary";

  function ir(evento, ruta) {
    evento.preventDefault();
    props.onNavegar(ruta);
  }

  return (
    <NavbarBS bg={bg} variant={variante} expand="lg" className="shadow-sm">
      <Container>
        <NavbarBS.Brand href="/" onClick={(e) => ir(e, '/')}>
          {marca}
        </NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="menu-navegacion" />
        <NavbarBS.Collapse id="menu-navegacion">
          <Nav className="ms-auto">
            <Nav.Link href="/" onClick={(e) => ir(e, '/')}>Inicio</Nav.Link>
            <Nav.Link href="/catalogo" onClick={(e) => ir(e, '/catalogo')}>Catálogo</Nav.Link>
            <Nav.Link href="/nutricionistas" onClick={(e) => ir(e, '/nutricionistas')}>Nutricionistas</Nav.Link>
            <Nav.Link href="/agendar" onClick={(e) => ir(e, '/agendar')}>Agendar cita</Nav.Link>
            <Nav.Link href="/contacto" onClick={(e) => ir(e, '/contacto')}>Contacto</Nav.Link>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;