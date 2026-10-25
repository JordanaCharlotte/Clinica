import Card from 'react-bootstrap/Card';
import Etiqueta from '../atoms/Etiqueta';
import Boton from '../atoms/Boton';

function TarjetaNutricionista(props) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
                <Etiqueta texto={props.especialidad} variante="info" className="mb-2 align-self-start" />
                <Card.Title>{props.nombre}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                    {props.descripcion}
                </Card.Text>
                <Boton texto="Elegir" variante="outline-success" onClick={props.onElegir} />
            </Card.Body>
        </Card>
    );
}

export default TarjetaNutricionista;