import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Selector from '../atoms/Selector'
import Boton from '../atoms/Boton'
import SelectorHorario from '../molecules/SelectorHorario'
import { validarObligatorio, validarFecha } from '../../utils/validacionesCita'


//no navega, cuando esta todo correcto avisa a la pagina con props.onEnviar

function FormularioAgendarCita(props) {
    const inicial = props.inicial ?? {}
    const [servicioId, setServicioId] = useState(inicial.servicioId ?? '')
    const [nutricionistaId, setNutricionistaId] = useState(inicial.nutricionistaId ?? '')
    const [fecha, setFecha] = useState(inicial.fecha ?? '')
    const [hora, setHora] = useState(inicial.hora ?? '')
    const [errores, setErrores] = useState({})


    //fecha de hoy en formato aaaa-mm-dd
    const hoy = new Date().toLocaleDateString('en-CA')
    const opcionesServicio = (props.servicios ?? []).map((s) => ({valor: s.id, texto: s.nombre}))
    const opcionesNutricionista = (props.nutricionistas ?? []).map((n) => ({ valor: n.id, texto: n.nombre}))

    function manejarEnvio(e) {
        e.preventDefault()

        const nuevos = {
            servicio: validarObligatorio(servicioId, 'Elige un servicio'),
            nutricionista: validarObligatorio(nutricionistaId, 'Elige un nutricionista'),
            fecha: validarFecha(fecha, hoy),
            hora: validarObligatorio(hora, 'Elige una hora'),
        }
        setErrores(nuevos)
        const hayError = Object.values(nuevos).some((mensaje) => mensaje !== '')
        if (!hayError) {
            props.onEnviar({ servicioId, nutricionistaId, fecha, hora })
        }
    }

    return (
        <Form noValidate onSubmit={manejarEnvio}>
            <Form.Group controlId="servicio" className="mb-3">
                <Form.Label>Servicio</Form.Label>
                <Selector
                    valor={servicioId}
                    opciones={opcionesServicio}
                    onChange={setServicioId}
                    placeholder="Selecciona un servicio"
                    error={errores.servicio}
                />
            </Form.Group>
            <Form.Group controlId="nutricionista" className="mb-3">
                <Form.Label>Nutricionista</Form.Label>
                <Selector
                    valor={nutricionistaId}
                    opciones={opcionesNutricionista}
                    onChange={setNutricionistaId}
                    placeholder="Selecciona una nutricionista"
                    error={errores.nutricionista}
                />
            </Form.Group>
            <SelectorHorario
                fecha={fecha}
                hora={hora}
                min={hoy}
                horas={props.horas}
                onCambiarFecha={setFecha}
                onCambiarHora={setHora}
                error={errores.fecha || errores.hora}
            />
            <Boton texto="Continuar" />
        </Form>
    )

}

export default FormularioAgendarCita;