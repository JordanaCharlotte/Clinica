import Form from 'react-bootstrap/Form'

function Input(props) {
    const tipo = props.type || "text";
    return (
        <Form.Control
            type={tipo}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        />
    );
}

export default Input;