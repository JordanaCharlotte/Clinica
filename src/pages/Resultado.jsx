import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import { useNavigate, useParams } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { obtenerCita } from '../services/citaService'

function Resultado() {
    const navigate = useNavigate()
    const params = useParams()

    const [cita, setCita] = useState(null)
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function cargarCita() {
            try {
                const datos = await obtenerCita(Number(params.id))
                setCita(datos)
            } catch {
                setError('No se pudo cargar la cita.')
            } finally {
                setCargando(false)
            }
        }

        cargarCita()
    }, [params.id])

    if (cargando) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <p>Cargando cita...</p>
                </Container>
            </PlantillaPublica>
        )
    }

    if (error || !cita) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <h2>No se pudo cargar la cita</h2>
                    <p>{error || `No existe una cita con el número "${params.id}".`}</p>
                    <Boton
                        texto="Volver a agendar"
                        onClick={() => navigate('/agendar')}
                    />
                </Container>
            </PlantillaPublica>
        )
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5" style={{ maxWidth: 600 }}>
                <h2 className="text-center mb-3">¡Cita agendada!</h2>

                <p className="text-center">
                    Número de cita: <strong>{cita.id}</strong>
                </p>

                <ul className="list-unstyled mb-4">
                    <li><strong>Paciente:</strong> {cita.nombre} ({cita.correo})</li>
                    <li><strong>Servicio:</strong> {cita.servicio}</li>
                    <li><strong>Nutricionista:</strong> {cita.nutricionista}</li>
                    <li><strong>Fecha y hora:</strong> {cita.fecha} a las {cita.hora}</li>
                    <li><strong>Total:</strong> {cita.precio}</li>
                </ul>
                <Boton
                    texto="Volver al catálogo"
                    onClick={() => navigate('/catalogo')}
                />
            </Container>
        </PlantillaPublica>
    )
}

export default Resultado