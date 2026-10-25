import Badge from 'react-bootstrap/Badge'

function EtiquetaEstadoCita({ estado }) {
    const variantes = {
        pendiente: 'warning',
        confirmada: 'success',
        reprogramada: 'info',
        cancelada: 'danger'
    }

    return (
        <Badge bg={variantes[estado] ?? 'secondary'}>
            {estado}
        </Badge>
    )
}

export default EtiquetaEstadoCita
