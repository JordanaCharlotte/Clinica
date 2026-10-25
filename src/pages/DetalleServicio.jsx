import { useNavigate, useParams } from 'react-router-dom'
import { Container, Card } from 'react-bootstrap'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import Boton from '../components/atoms/Boton'
import { formatoPrecio } from '../utils/formatoPrecio'
import servicios from '../data/servicios'

function DetalleServicio() {
    const { id } = useParams()
    const navigate = useNavigate()

    const servicio = servicios.find(
        (item) => String(item.id) === String(id)
    )

    if (!servicio) {
        return (
            <PlantillaPublica>
                <Container className="py-5 text-center">
                    <h1 className="h3">Servicio no encontrado</h1>
                    <p>El servicio que buscas no existe.</p>

                    <Boton
                        texto="Volver al catálogo"
                        onClick={() => navigate('/catalogo')}
                    />
                </Container>
            </PlantillaPublica>
        )
    }

    return (
        <PlantillaPublica>
            <Container className="py-5">
                <Card className="mx-auto" style={{ maxWidth: 700 }}>
                    <Card.Body>
                        <h1 className="h3 mb-3">{servicio.nombre}</h1>

                        <p>{servicio.descripcion}</p>

                        <p>
                            <strong>Categoría:</strong>{' '}
                            {servicio.categoria}
                        </p>

                        <p>
                            <strong>Precio:</strong>{' '}
                            {formatoPrecio(servicio.precio)}
                        </p>

                        <Boton
                            texto="Agendar cita"
                            onClick={() =>
                                navigate('/agendar', {
                                    state: {
                                        servicioId: servicio.id,
                                    },
                                })
                            }
                        />
                    </Card.Body>
                </Card>
            </Container>
        </PlantillaPublica>
    )
}

export default DetalleServicio
