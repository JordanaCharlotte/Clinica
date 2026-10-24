import Form from 'react-bootstrap/Form';

function Selector(props) {
    const error = props.error ?? '';
    const opciones = props.opciones ?? [];

    return (
        <>
            <Form.Select
                id={props.id}
                value={props.valor}
                onChange={(e) => props.onChange(e.target.value)}
                isInvalid={error !== ''}
                >
                    <option value="">{props.placeholder ?? 'Selecciona una opcion'} </option>
                    {opciones.map((o) => (
                        <option key={o.valor} value={o.valor}>{o.texto}</option>
                    ))}

                </Form.Select>
                <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
        </>
        
    );
}

export default Selector;