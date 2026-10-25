import Badge from 'react-bootstrap/Badge'

function EtiquetaModalidad(props) {
    const modalidad = props.modalidad || 'Presencial'
    const variante =
        modalidad === 'Presencial' ? 'success' : 'info'

    return (
        <Badge bg={variante}>
            {modalidad}
        </Badge>
    )
}

export default EtiquetaModalidad
