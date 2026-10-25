import { Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import { useServicios } from '../context/ServiciosContext'
import { formatoPrecio } from '../utils/formatoPrecio'

function Ofertas() {
    const navigate = useNavigate()
    const { servicios } = useServicios()

    const ofertas = servicios.filter(
        (servicio) =>
            servicio.oferta === true &&
            servicio.disponibilidad !== false
    )

    return (
        <PlantillaPublica>
            <Container className="py-5">
                <h1 className="h3 mb-4 text-center">
                    Ofertas
                </h1>

                {ofertas.length === 0 ? (
                    <p className="text-center">
                        No hay ofertas disponibles.
                    </p>
                ) : (
                    <div className="row g-4">
                        {ofertas.map((servicio) => (
                            <div
                                className="col-12 col-md-6"
                                key={servicio.id}
                            >
                                <article className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <span className="badge text-bg-success mb-2">
                                            Oferta
                                        </span>

                                        <h2 className="h5">
                                            {servicio.nombre}
                                        </h2>

                                        <p className="text-body-secondary">
                                            {servicio.descripcion}
                                        </p>

                                        <p className="mb-1">
                                            <strong>
                                                Precio anterior:{' '}
                                            </strong>

                                            <del>
                                                {formatoPrecio(
                                                    servicio.precioAnterior
                                                )}
                                            </del>
                                        </p>

                                        <p className="fs-5 fw-bold text-success">
                                            {formatoPrecio(
                                                servicio.precio
                                            )}
                                        </p>

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() =>
                                                navigate(
                                                    `/servicio/${servicio.id}`
                                                )
                                            }
                                        >
                                            Ver detalle
                                        </button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                )}
            </Container>
        </PlantillaPublica>
    )
}

export default Ofertas
