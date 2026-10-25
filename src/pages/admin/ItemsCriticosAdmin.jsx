import { useServicios } from '../../context/ServiciosContext'

function ItemsCriticosAdmin() {
    const { servicios } = useServicios()

    const criticos = servicios.filter(
        (servicio) =>
            servicio.disponibilidad === false ||
            Number(servicio.cupos) <= 3
    )

    return (
        <>
            <h1 className="h3 mb-4">Ítems críticos</h1>

            {criticos.length === 0 ? (
                <p>No hay servicios críticos por el momento.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Servicio</th>
                                <th>Categoría</th>
                                <th>Cupos</th>
                                <th>Disponibilidad</th>
                            </tr>
                        </thead>

                        <tbody>
                            {criticos.map((servicio) => (
                                <tr key={servicio.id}>
                                    <td>{servicio.nombre}</td>
                                    <td>{servicio.categoria}</td>
                                    <td>{servicio.cupos}</td>
                                    <td>
                                        {servicio.disponibilidad
                                            ? 'Disponible'
                                            : 'No disponible'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default ItemsCriticosAdmin
