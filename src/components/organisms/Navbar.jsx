import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

function BarraNavegacion() {
    return (
        <Navbar bg="success" variant="dark" expand="md" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">NutriVida</Navbar.Brand>
                <Navbar.Toggle aria-controls="menu-principal" />
                <Navbar.Collapse id="menu-principal">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
                        <Nav.Link as={NavLink} to="/catalogo">Catálogo</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default BarraNavegacion;