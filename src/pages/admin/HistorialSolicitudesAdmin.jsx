import { Table } from 'react-bootstrap'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import { obtenerCitas } from '../../services/citaService'

function HistorialSolicitudesAdmin() {
    const citas = obtenerCitas()

    return (
        <PlantillaAdmin titulo="Historial de solicitudes">
            {citas.length === 0 ? (
                <p>No hay solicitudes registradas.</p>
            ) : (
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Paciente</th>
                            <th>Correo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>

                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.id}</td>
                                <td>{cita.nombre}</td>
                                <td>{cita.correo}</td>
                                <td>{cita.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </PlantillaAdmin>
    )
}

export default HistorialSolicitudesAdmin
