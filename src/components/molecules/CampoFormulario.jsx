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
        </Form.Group>
    );
}

export default CampoFormulario;


