import { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import { CampoFormulario } from '../components/molecules/CampoFormulario'
import Boton from '../components/atoms/Boton'
import { useCita } from '../context/CitaContext'
import { citasDeUsuario, guardarCita } from '../services/citaService'
import { validarTeleconsulta } from '../utils/reglasCita'
import { validarObligatorio, validarCorreo } from '../utils/validacionesCita'
import servicios from '../data/servicios'
import nutricionistas from '../data/nutricionistas'

function Confirmacion() {
    const navigate = useNavigate()
    const { citaEnCurso, reiniciarCita } = useCita()
    const datos = citaEnCurso ?? {}

    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [errorNombre, setErrorNombre] = useState('')
    const [errorCorreo, setErrorCorreo] = useState('')
    const [errorRegla, setErrorRegla] = useState('')

    const servicio = servicios.find((s) => s.id === datos.servicioId)
    const nutricionista = nutricionistas.find((n) => n.id === datos.nutricionistaId)

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

        //aca la regla de teleconsulta: solo se revisa si el correo es valid
        const errR = validarTeleconsulta(servicio.codigo, citasDeUsuario(correo))
        if (errR !== '') {
            return
        }
        
        

        const cita = guardarCita({
            ...datos,
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
            <Container className="mt-5" style={{ maxWidth: 600 }}>
                <h2 className="text-center mb-4">Confirma tu cita</h2>
                <ul className="list-unstyled mb-4">
                    <li><strong>Servicio:</strong> {servicio.nombre} ({servicio.precio})</li>
                    <li><strong>Nutricionista:</strong> {nutricionista.nombre}</li>
                    <li><strong>Fecha y hora:</strong> {datos.fecha} a las ({datos.hora})</li>

                </ul>
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