import { useServicios } from '../../context/ServiciosContext'

function CategoriasAdmin() {
    const { servicios } = useServicios()

    const categorias = [
        ...new Set(servicios.map((servicio) => servicio.categoria)),
    ]

    return (
        <>
            <h1 className="h3 mb-4">Categorías</h1>

            {categorias.length === 0 ? (
                <p>No hay categorías registradas.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Categoría</th>
                                <th>Cantidad de servicios</th>
                            </tr>
                        </thead>

                        <tbody>
                            {categorias.map((categoria) => {
                                const cantidad = servicios.filter(
                                    (servicio) =>
                                        servicio.categoria === categoria
                                ).length

                                return (
                                    <tr key={categoria}>
                                        <td>{categoria}</td>
                                        <td>{cantidad}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

export default CategoriasAdmin
