import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import FormularioAgendarCita from '../components/organisms/FormularioAgendarCita'
import { useCita } from '../context/CitaContext'
import nutricionistas, { horasDisponibles } from '../data/nutricionistas'

function AgendarCita(props) {
    const navigate = useNavigate()
    const { citaEnCurso, actualizarCita } = useCita()

    function alEnviar(datos) {
        actualizarCita(datos)
        navigate('/confirmacion')
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5" style={{ maxWidth: 600}}>
                <h2 className="text-center mb-4">Agendar cita</h2>
                <FormularioAgendarCita
                    servicios={props.servicios}
                    nutricionistas={nutricionistas}
                    horas={horasDisponibles}
                    inicial={citaEnCurso}
                    onEnviar={alEnviar}
                />
            </Container>
        </PlantillaPublica>
    )
}

export default AgendarCita;