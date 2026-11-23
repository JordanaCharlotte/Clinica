import { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useAuth } from '../context/AuthContext'
import { obtenerCitas } from '../services/citaService'

function MisCitas() {
    const { usuario } = useAuth()
    const [citas, setCitas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        async function cargarCitas() {
            if (!usuario) {
                setCitas([])
                setCargando(false)
                return
            }

            try {
                setCargando(true)
                setError('')

                const datos = await obtenerCitas()

                if (Array.isArray(datos)) {
                    setCitas(datos)
                } else if (datos && Array.isArray(datos.citas)) {
                    setCitas(datos.citas)
                } else if (datos && datos.id) {
                    setCitas([datos])
                } else {
                    setCitas([])
                }
            } catch (error) {
                console.error(error)
                setError('No se pudieron cargar tus citas.')
            } finally {
                setCargando(false)
            }
        }

        cargarCitas()
    }, [usuario])

    return (
        <PlantillaPublica>
            <div className="container mt-5">
                <h2>Mis citas</h2>

                {!usuario ? (
                    <p>Debes iniciar sesión para ver tus citas.</p>
                ) : cargando ? (
                    <p>Cargando tus citas...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : citas.length === 0 ? (
                    <p>No tienes citas registradas.</p>
                ) : (
                    <Table striped bordered responsive>
                        <thead>
                            <tr>
                                <th>Número</th>
                                <th>Servicio</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                            </tr>
                        </thead>

                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.id}</td>
                                    <td>
                                        {cita.servicio ||
                                            cita.servicioNombre ||
                                            'Servicio no informado'}
                                    </td>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </div>
        </PlantillaPublica>
    )
}

export default MisCitas
