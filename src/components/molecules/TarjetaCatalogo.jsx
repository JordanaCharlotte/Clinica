import Card from 'react-bootstrap/Card';
import Etiqueta from '../atoms/Etiqueta';
import EtiquetaModalidad from '../atoms/EtiquetaModalidad';
import { Precio } from '../atoms/Precio';
import Boton from '../atoms/Boton';

// Molecula "TarjetaCatalogo": combina los atomos Etiqueta, EtiquetaModalidad, Precio y Boton.
// Todos los datos llegan por props, no hay nada escrito a mano aqui adentro.
// onVerDetalle es opcional: si no llega, el boton "Ver detalle" no se muestra.
function TarjetaCatalogo(props) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
                <div className="d-flex gap-2 mb-2">
                    <Etiqueta texto={props.categoria} variante="success" />
                    {props.modalidad && <EtiquetaModalidad modalidad={props.modalidad} />}
                </div>
                <Card.Title>{props.nombre}</Card.Title>
                <Card.Text className="text-muted small flex-grow-1">
                    {props.descripcion}
                </Card.Text>
                <Precio valor={props.precio} anterior={props.precioAnterior} />
                <div className="d-flex gap-2">
                    {props.onVerDetalle && (
                        <Boton
                            texto="Ver detalle"
                            variante="outline-secondary"
                            onClick={props.onVerDetalle}
                        />
                    )}
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