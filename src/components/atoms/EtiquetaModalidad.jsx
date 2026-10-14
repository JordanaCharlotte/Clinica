import Badge from 'react-bootstrap/Badge';

function EtiquetaModalidad(props) {
    const modalidad = props.modalidad || 'Presencial';
    const variante = modalidad === 'Presencial' ? 'success' : 'info';
    return (
        <span className={'badge bd-${variante}'}>
            {modalidad}
        </span>
    );
}

export default EtiquetaModalidad;