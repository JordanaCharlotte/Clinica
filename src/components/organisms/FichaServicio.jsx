import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Etiqueta from '../atoms/Etiqueta';
import EtiquetaModalidad from '../atoms/EtiquetaModalidad';
import { Precio } from '../atoms/Precio';
import Boton from '../atoms/Boton';

function FichaServicio(props) {
    const s = props.servicio;

    return (
        <Card className="shadow-sm">
            <Card.Body>
                <div className="d-flex gap-2 mb-2">
                    <Etiqueta texto={s.categoria} variante="success" />
                    <EtiquetaModalidad modalidad={s.modalidad} />
                </div>
                <Card.Title as="h2">{s.nombre}</Card.Title>
                <Card.Text>{s.descripcion}</Card.Text>
                <ListGroup variant="flush" className="mb-3">
                    <ListGroup.Item>Código: {s.codigo}</ListGroup.Item>
                    <ListGroup.Item>Duración: {s.duracion}</ListGroup.Item>
                    <ListGroup.Item>Profesional: {s.profesional}</ListGroup.Item>
                    <ListGroup.Item>Cupos disponibles: {s.cupos}</ListGroup.Item>
                </ListGroup>
                <Precio valor={s.precio} anterior={s.precioAnterior} />
                <div className="d-flex gap-2">
                    <Boton texto="Volver al catálogo" variante="outline-secondary" onClick={props.onVolver} />
                    <Boton texto="Agendar" variante="success" onClick={props.onAgendar} />
                </div>
            </Card.Body>
        </Card>
    );
}

export default FichaServicio;