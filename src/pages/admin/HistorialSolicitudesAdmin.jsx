import { Table } from 'react-bootstrap'
import { obtenerCitas } from '../../services/citaService'

function HistorialSolicitudesAdmin() {
    const citas = obtenerCitas()

    return (
        <>
            <h1 className="h3 mb-4">
                Historial de solicitudes
            </h1>

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
        </>
    )
}

export default HistorialSolicitudesAdmin
