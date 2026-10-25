import { Table } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import { citasDeUsuario } from '../services/citaService'

function MisCitas() {
    const correo = 'usuario@correo.cl'
    const citas = citasDeUsuario(correo)

    return (
        <PlantillaPublica>
            <div className="container mt-5">
                <h2>Mis citas</h2>
                {citas.length === 0 ? (
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
                                    <td>{cita.servicioNombre}</td>
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
