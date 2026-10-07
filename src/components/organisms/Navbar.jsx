import NavbarBS from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function Navbar(props) {
  const marca = props.marca || "Mi Aplicación";
  const variante = props.variante || "dark";
  const bg = props.bg || "primary";

  return (
    <NavbarBS bg={bg} variant={variante} expand="lg" className="shadow-sm">
      <Container>
        <NavbarBS.Brand href="#home" className="fw-bold">
          {marca}
        </NavbarBS.Brand>
        <NavbarBS.Toggle aria-controls="menu-navegacion" />
        <NavbarBS.Collapse id="menu-navegacion">
          <Nav className="ms-auto">
            <Nav.Link href="#inicio">Inicio</Nav.Link>
            <Nav.Link href="#catalogo">Catálogo</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>
          </Nav>
        </NavbarBS.Collapse>
      </Container>
    </NavbarBS>
  );
}

export default Navbar;