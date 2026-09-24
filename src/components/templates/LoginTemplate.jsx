import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LoginTemplate(props) {
    return (
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={12} md={8} lg={5}>
                    <h2 className="mb-4 text-center"> Iniciar Sesion</h2>
                    {props.children}
                </Col>
            </Row>
        </Container>
    );
}

export default LoginTemplate;