import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    listarServicios,
    eliminarServicio,
} from '../../services/servicioService'

function CatalogoAdmin() {
    const [servicios, setServicios] = useState(() => listarServicios())

    function eliminar(id) {
        eliminarServicio(id)
        setServicios(listarServicios())
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="h3">Catálogo de servicios</h1>

                <Link to="/admin/catalogo/nuevo" className="btn btn-primary">
                    Nuevo servicio
                </Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Categoría</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.id}>
                                <td>{servicio.nombre}</td>
                                <td>{servicio.categoria}</td>
                                <td>${servicio.precio}</td>
                                <td>
                                    <Link
                                        to={`/admin/catalogo/${servicio.id}/editar`}
                                        className="btn btn-sm btn-outline-primary me-2"
                                    >
                                        Editar
                                    </Link>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => eliminar(servicio.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CatalogoAdmin
