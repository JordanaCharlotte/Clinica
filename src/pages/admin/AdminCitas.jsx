import { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import {obtenerCitas, modificarCita, reprogramarCita,} from '../../services/citaService'
import EtiquetaEstadoCita from '../../components/atoms/EtiquetaEstadoCita'

function AdminCitas() {
    const navigate = useNavigate()
    const [citas, setCitas] = useState(() => obtenerCitas())
    const [fechaNueva, setFechaNueva] = useState('')
    const [horaNueva, setHoraNueva] = useState('')


    function cambiarEstado(id, estado) {
        modificarCita(id, { estado })
        setCitas(obtenerCitas())
        
    }

    function cambiarFechaHora(id) {
    if (!fechaNueva || !horaNueva) {
        return
    }

    reprogramarCita(id, fechaNueva, horaNueva)
    setCitas(obtenerCitas())
    setFechaNueva('')
    setHoraNueva('')
}

    return (
        <>
        <h1 className="h3 mb-4">Solicitudes de citas</h1>
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

                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            className="form-control form-control-sm mb-1"
                                            value={fechaNueva}
                                            onChange={(e) => setFechaNueva(e.target.value)}
                                        />

                                        <input
                                            type="time"
                                            className="form-control form-control-sm mb-1"
                                            value={horaNueva}
                                            onChange={(e) => setHoraNueva(e.target.value)}
                                        />

                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            onClick={() => cambiarFechaHora(cita.id)}
                                        >
                                            Reprogramar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default AdminCitas
