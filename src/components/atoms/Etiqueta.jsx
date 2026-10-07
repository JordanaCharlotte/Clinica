import Badge from 'react-bootstrap/Badge';

function Etiqueta(props) {
    const variante = props.variante || "secondary";
    return (
        <Badge bg={variante} className={props.className}>
            {props.texto}
        </Badge>
    );
}

export default Etiqueta;