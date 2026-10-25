import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PlantillaAdmin from '../../components/templates/PlantillaAdmin'
import {obtenerCitas, modificarCita} from '../../services/citaService'
import EtiquetaEstadoCita from '../../components/atoms/EtiquetaEstadoCita'

function AdminCitas() {
    const navigate = useNavigate()
    const [citas, setCitas] = useState(() => obtenerCitas())

    function cambiarEstado(id, estado) {
        modificarCita(id, { estado })
        setCitas(obtenerCitas())
    }

    return (
        <PlantillaAdmin titulo="Solicitudes de citas">
            {citas.length === 0 ? (
                <p>No hay solicitudes registradas.</p>
            ) : (
                <Table striped bordered responsive>
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Paciente</th>
                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {citas.map((cita) => (
                            <tr key={cita.id}>
                                <td>{cita.id}</td>
                                <td>{cita.nombre}</td>
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>
                                    <EtiquetaEstadoCita
                                        estado={cita.estado}
                                    />
                                </td>
                                <td>
                                    <Button
                                        size="sm"
                                        className="me-2"
                                        onClick={() =>
                                            cambiarEstado(
                                                cita.id,
                                                'confirmada'
                                            )
                                        }
                                    >
                                        Confirmar
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="warning"
                                        className="me-2"
                                        onClick={() =>
                                            navigate(
                                                `/admin/comprobante/${cita.id}`
                                            )
                                        }
                                    >
                                        Ver comprobante
                                    </Button>

                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() =>
                                            cambiarEstado(
                                                cita.id,
                                                'cancelada'
                                            )
                                        }
                                    >
                                        Cancelar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </PlantillaAdmin>
    )
}

export default AdminCitas
