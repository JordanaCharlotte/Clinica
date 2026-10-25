import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PlantillaPublica } from '../components/templates/PlantillaPublica';
import TarjetaNutricionista from '../components/molecules/TarjetaNutricionista';
import { useCita } from '../context/CitaContext';
import nutricionistas from '../data/nutricionistas';

function Nutricionistas() {
    const navegar = useNavigate();
    const { actualizarCita } = useCita();

    function elegir(id) {
        actualizarCita({ nutricionistaId: id });
        navegar('/agendar');
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5">
                <h2 className="text-center mb-4">Nuestros nutricionistas</h2>
                <Row>
                    {nutricionistas.map((n) => (
                        <Col key={n.id} xs={12} md={6} lg={3} className="mb-3">
                            <TarjetaNutricionista
                                nombre={n.nombre}
                                especialidad={n.especialidad}
                                descripcion={n.descripcion}
                                onElegir={() => elegir(n.id)}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </PlantillaPublica>
    );
}

export default Nutricionistas;