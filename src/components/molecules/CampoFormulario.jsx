import Form from 'react-bootstrap/Form'

export function CampoFormulario(props) {

    const error = props.error ?? ''
    const tipo = props.tipo ?? 'text'

    return (
        <Form.Group controlId={props.controlId} className="mb-3">
            <Form.Label>{props.etiqueta}</Form.Label>
            <Form.Control
                type={tipo}
                value={props.valor}
                onChange={(e => props.onChange(e.target.value))}
                isInvalid={error !== ''}
                aria-invalid={error !== ''}
            />

            {/* feedback muestra mensaje debajo del campo solo cuando el campo es invalido*/}
            <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>


        </Form.Group>
    );
}


