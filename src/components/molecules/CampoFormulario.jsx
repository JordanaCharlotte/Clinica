import Form from 'react-bootstrap/Form'
import Input from '../atoms/Input'

function CampoFormulario(props) {
    return (
        <Form.Group controlId={props.controlId} className="mb-3">
            <Form.Label>{props.label}</Form.Label>
            <Input 
                type={props.type} 
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            {/* Si props.error tiene texto, se muestra en rojo debajo del input */}
            {props.error && (
                <Form.Text className="text-danger">
                    {props.error}
                </Form.Text>
            )}
        </Form.Group>
    );
}

export default CampoFormulario;