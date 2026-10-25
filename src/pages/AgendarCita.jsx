import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import FormularioAgendarCita from '../components/organisms/FormularioAgendarCita'
import { useCita } from '../context/CitaContext'
import servicios from '../data/servicios'
import nutricionistas, { horasDisponibles } from '../data/nutricionistas'

// Solicitud en curso: la persona elige servicio, nutricionista, fecha y hora.
// Lo que ya venía elegido (por ejemplo desde Nutricionistas) aparece marcado.
function AgendarCita() {
    const navigate = useNavigate()
    const { citaEnCurso, actualizarCita } = useCita()

    function continuar(datos) {
        // El <select> entrega texto: se recupera el id original (número o texto).
        const servicio = servicios.find((s) => String(s.id) === String(datos.servicioId))
        const nutricionista = nutricionistas.find((n) => String(n.id) === String(datos.nutricionistaId))
        actualizarCita({
            ...datos,
            servicioId: servicio?.id ?? datos.servicioId,
            nutricionistaId: nutricionista?.id ?? datos.nutricionistaId,
        })
        navigate('/confirmacion')
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5 mb-5" style={{ maxWidth: 600 }}>
                <FormularioAgendarCita
                    servicios={servicios}
                    nutricionistas={nutricionistas}
                    horas={horasDisponibles}
                    inicial={citaEnCurso ?? {}}
                    onEnviar={continuar}
                />
            </Container>
        </PlantillaPublica>
    )
}

export default AgendarCita;
