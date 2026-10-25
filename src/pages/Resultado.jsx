import Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { obtenerCita } from '../services/citaService'

//pagina para el resultado de la solicitud la ruta es /resultado/:id
function Resultado() {
    const navigate = useNavigate()
    const params = useParams()

    const cita = obtenerCita(Number(params.id))

    if (!cita) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <h2>No se pudo agendar la cita</h2>
                    <p>No existe una solicitud con el número "{params.id}".</p>
                    <Boton texto="Volver a la solicitud" onClick={() => navigate('/agendar')}/>
                </Container>
            </PlantillaPublica>
        )
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5" style={{ maxWidth: 600 }}>
                <h2 className="text-center mb-3">¡Cita agendada!</h2>
                <p className="text-center">Número de cita: <strong>{cita.id}</strong></p>
                <ul className="list-unstyled mb-4">
                    <li><strong>Paciente:</strong> {cita.nombre} ({cita.correo})</li>
                    <li><strong>Servicio:</strong> {cita.servicioNombre}</li>
                    <li><strong>Nutricionista:</strong> {cita.nutricionistaNombre}</li>
                    <li><strong>Fecha y hora:</strong> {cita.fecha} a las {cita.hora}</li>
                    <li><strong>Total:</strong> {cita.precio}</li>
                </ul>
                <Boton texto="Volver al catálogo" onClick={() => navigate('/catalogo')}/>
            </Container>
        </PlantillaPublica>
    )

}
export default Resultado;