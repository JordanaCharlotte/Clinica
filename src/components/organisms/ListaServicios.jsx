import { Row, Col } from 'react-bootstrap';
import TarjetaCatalogo from '../molecules/TarjetaCatalogo';


function ListaServicio(props) {
    if (props.servicio.length === 0) {
        return (
            <p className="text-center text-muted">
                {props.mensajeVacio ?? 'No hay servicios para mostrar.'}
            </p>
        );
    }

    return (
        <Row xs={1} md={2} lg={3} className="g-4">
            {props.servicios.map((s) => (
                <Col key={s.id}>
                    <TarjetaCatalogo
                        categoria={s.categoria}
                        modalidad={s.modalidad}
                        nombre={s.nombre}
                        descripcion={s.descripcion}
                        precio={s.precio}
                        precioAnterior={s.precioAnterior}
                        onVerDetalle={() => props.onVerDetalle(s.id)}
                        onAgendar={() => props.onAgendar(s)}
                    />
                </Col>
            ))}
        </Row>
    );
}

export default ListaServicios;