import Form from 'react-bootstrap/Form';
import Selector from '../atoms/Selector';

function SelectorHorario(props) {
    const error = props.error ?? '';
    const opciones = (props.horas ?? []).map((h) => ({ valor: h, texto: h}));

    return (
        <Form.Group controlId="fecha" className="mb-3">
           <Form.Label>Fecha y hora</Form.Label>
           <Form.Control
                type="date"
                min={props.min}
                value={props.fecha}
                onChange={(e) => props.onCambiarFecha(e.target.value)}
                isInvalid={error !== ''}
                className="mb-2"
            />
            <Selector
                id="hora"
                valor={props.hora}
                opciones={opciones}
                onChange={props.onCambiarHora}
                placeholder="Selecciona una hora"
                error={error}
            />
        </Form.Group>
    );
}

export default SelectorHorario;