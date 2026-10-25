import Form from 'react-bootstrap/Form';


function BuscadorServicios(props) {
    return (
        <Form.Group controlId="buscador" className="mb-3">
            <Form.Label>Buscar servicio</Form.Label>
            <Form.Control
                type="search"
                placeholder="Ej: plan, taller, teleconsulta"
                value={props.valor}
                onChange={(e) => props.onCambiar(e.target.value)}
            />
        </Form.Group>
    );
}

export default BuscadorServicios;