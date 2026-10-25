import { Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import { obtenerCita } from '../../services/citaService'

function ComprobanteAdmin() {
    const { id } = useParams()
    const cita = obtenerCita(Number(id))

    if (!cita) {
        return (
            <PlantillaAdmin titulo="Comprobante">
                <p>No se encontró la solicitud.</p>
            </PlantillaAdmin>
        )
    }

    return (
        <PlantillaAdmin titulo="Comprobante de solicitud">
            <Card>
                <Card.Body>
                    <p>
                        <strong>Número:</strong> {cita.id}
                    </p>
                    <p>
                        <strong>Paciente:</strong> {cita.nombre}
                    </p>
                    <p>
                        <strong>Correo:</strong> {cita.correo}
                    </p>
                    <p>
                        <strong>Servicio:</strong> {cita.servicioNombre}
                    </p>
                    <p>
                        <strong>Nutricionista:</strong>{' '}
                        {cita.nutricionistaNombre}
                    </p>
                    <p>
                        <strong>Fecha:</strong> {cita.fecha}
                    </p>
                    <p>
                        <strong>Hora:</strong> {cita.hora}
                    </p>
                    <p>
                        <strong>Total:</strong> ${cita.precio}
                    </p>
                    <p>
                        <strong>Estado:</strong> {cita.estado}
                    </p>
                </Card.Body>
            </Card>
        </PlantillaAdmin>
    )
}

export default ComprobanteAdmin
