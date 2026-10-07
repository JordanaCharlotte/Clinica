import Card from 'react-bootstrap/Card';
import Etiqueta from '../atoms/Etiqueta';
import Boton from '../atoms/Boton';

// Molecula "TarjetaCatalogo": combina los atomos Etiqueta y Boton.
// Todos los datos llegan por props, no hay nada escrito a mano aqui adentro.
function TarjetaCatalogo(props) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
                <Etiqueta texto={props.categoria} variante="success" className="mb-2 align-self-start" />
                <Card.Title>{props.nombre}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                    {props.descripcion}
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-2">
                    <strong>{props.precio}</strong>
                    <Boton
                        texto="Agendar"
                        variante="outline-success"
                        onClick={props.onAgendar}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}

export default TarjetaCatalogo;