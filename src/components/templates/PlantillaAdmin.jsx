import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

function PlantillaAdmin({ children, titulo }) {
    const navigate = useNavigate()

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/admin/citas">
                        NutriVida Admin
                    </Navbar.Brand>

                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/admin/citas">
                            Citas
                        </Nav.Link>

                        <Nav.Link as={Link} to="/admin/historial">
                            Historial
                        </Nav.Link>

                        <Nav.Link onClick={() => navigate('/')}>
                            Volver
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            <main className="py-4">
                <Container>
                    {titulo && <h1 className="mb-4">{titulo}</h1>}
                    {children}
                </Container>
            </main>
        </>
    )
}

export default PlantillaAdmin
