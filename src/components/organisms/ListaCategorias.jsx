import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Boton from '../atoms/Boton';

// Organismo: una tarjeta por categoria, con cuantos servicios tiene.
// props.categorias es la lista [{ nombre, cantidad }]; props.onElegir recibe el nombre.
function ListaCategorias(props) {
    return (
        <Row xs={1} md={2} lg={4} className="g-4">
            {props.categorias.map((c) => (
                <Col key={c.nombre}>
                    <Card className="h-100 shadow-sm text-center">
                        <Card.Body className="d-flex flex-column">
                            <Card.Title>{c.nombre}</Card.Title>
                            <Card.Text className="text-muted flex-grow-1">
                                {c.cantidad} {c.cantidad === 1 ? 'servicio' : 'servicios'}
                            </Card.Text>
                            <Boton
                                texto="Ver servicios"
                                variante="outline-success"
                                onClick={() => props.onElegir(c.nombre)}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
}

export default ListaCategorias;