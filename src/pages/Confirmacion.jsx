import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import { CampoFormulario } from '../components/molecules/CampoFormulario'
import Boton from '../components/atoms/Boton'
import { useCita } from '../context/CitaContext'
import { useAuth } from '../context/AuthContext'
import { citasDeUsuario, guardarCita } from '../services/citaService'
import { validarTeleconsulta } from '../utils/reglasCita'
import { validarObligatorio, validarCorreo } from '../utils/validacionesCita'
import { formatoPrecio } from '../utils/formatoPrecio'
import servicios from '../data/servicios'
import nutricionistas from '../data/nutricionistas'

function Confirmacion() {
    const navigate = useNavigate()
    const { usuario } = useAuth()
    const { citaEnCurso, reiniciarCita } = useCita()
    const datos = citaEnCurso ?? {}

    // Si hay sesión, los datos de la persona se completan solos.
    const [nombre, setNombre] = useState(usuario ? `${usuario.nombre} ${usuario.apellidos ?? ''}`.trim() : '')
    const [correo, setCorreo] = useState(usuario?.correo ?? '')
    const [errorNombre, setErrorNombre] = useState('')
    const [errorCorreo, setErrorCorreo] = useState('')
    const [errorRegla, setErrorRegla] = useState('')

    const servicio = servicios.find((s) => String(s.id) === String(datos.servicioId))
    const nutricionista = nutricionistas.find((n) => String(n.id) === String(datos.nutricionistaId))

    if (!servicio || !nutricionista) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <p>No hay una solicitud en curso.</p>
                    <Boton texto = "Agendar cita" onClick={() => navigate('/agendar')}/>
                </Container>
            </PlantillaPublica>
        )
    }

    function confirmar(e) {
        e.preventDefault()
        const errN = validarObligatorio(nombre, 'El nombre es obligatorio')
        const errC = validarCorreo(correo)
        setErrorNombre(errN)
        setErrorCorreo(errC)
        setErrorRegla('')

        if (errN !== '' || errC !== '') {
            return
        }

        //aca la regla de teleconsulta: solo se revisa si el correo es valido
        const errR = validarTeleconsulta(servicio.id, citasDeUsuario(correo))
        setErrorRegla(errR)
        if (errR !== '') {
            return
        }

        const cita = guardarCita({
            ...datos,
            servicioId: servicio.id,
            nutricionistaId: nutricionista.id,
            nombre,
            correo,
            servicioNombre: servicio.nombre,
            precio: servicio.precio,
            nutricionistaNombre: nutricionista.nombre
        })
        reiniciarCita()
        //el id viaja en la direccion: /resultado/3
        navigate(`/resultado/${cita.id}`)
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5 mb-5" style={{ maxWidth: 600 }}>
                <ul className="list-unstyled mb-4">
                    <li><strong>Servicio:</strong> {servicio.nombre} ({formatoPrecio(servicio.precio)})</li>
                    <li><strong>Nutricionista:</strong> {nutricionista.nombre}</li>
                    <li><strong>Fecha y hora:</strong> {datos.fecha} a las {datos.hora}</li>
                </ul>
                {usuario && (
                    <p className="small text-body-secondary">Completamos tus datos con tu cuenta. Puedes cambiarlos si lo necesitas.</p>
                )}
                <Form noValidate onSubmit={confirmar}>
                    <CampoFormulario
                        controlId="nombre"
                        etiqueta="Nombre"
                        tipo="text"
                        valor={nombre}
                        onChange={setNombre}
                        error={errorNombre}
                    />
                    <CampoFormulario
                    controlId="correo"
                    etiqueta="Correo"
                    tipo="email"
                    valor={correo}
                    onChange={setCorreo}
                    error={errorCorreo}
                    />
                    {errorRegla !== '' && <p className="text-danger">{errorRegla}</p>}
                    <Boton texto="Confirmar cita"/>
                </Form>
            </Container>
        </PlantillaPublica>
    )
}

export default Confirmacion;
