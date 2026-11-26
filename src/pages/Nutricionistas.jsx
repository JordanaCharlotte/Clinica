import { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PlantillaPublica } from '../components/templates/PlantillaPublica';
import TarjetaNutricionista from '../components/molecules/TarjetaNutricionista';
import { useCita } from '../context/CitaContext';
import { listarNutricionistas } from '../services/nutricionistaService';

function Nutricionistas() {
    const navegar = useNavigate();
    const { actualizarCita } = useCita();

    const [nutricionistas, setNutricionistas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function cargarNutricionistas() {
            try {
                setCargando(true);
                setError('');

                const datos = await listarNutricionistas();

                setNutricionistas(Array.isArray(datos) ? datos : []);
            } catch (error) {
                console.error('Error al cargar nutricionistas:', error);
                setError('No se pudieron cargar los nutricionistas.');
            } finally {
                setCargando(false);
            }
        }

        cargarNutricionistas();
    }, []);

    function elegir(id) {
        actualizarCita({ nutricionistaId: id });
        navegar('/agendar');
    }

    return (
        <PlantillaPublica>
            <Container className="mt-5">
                <h2 className="text-center mb-4">
                    Nuestros nutricionistas
                </h2>

                {cargando && (
                    <div className="text-center">
                        <Spinner animation="border" />
                        <p className="mt-2">Cargando nutricionistas...</p>
                    </div>
                )}

                {error && (
                    <Alert variant="danger">
                        {error}
                    </Alert>
                )}

                {!cargando && !error && (
                    <Row>
                        {nutricionistas.map((nutricionista) => (
                            <Col
                                key={nutricionista.id}
                                xs={12}
                                md={6}
                                lg={3}
                                className="mb-3"
                            >
                                <TarjetaNutricionista
                                    nombre={nutricionista.nombre}
                                    especialidad={nutricionista.especialidad}
                                    descripcion={
                                        nutricionista.descripcion ||
                                        `Atención: ${nutricionista.dias || 'Consultar días'}`
                                    }
                                    onElegir={() =>
                                        elegir(nutricionista.id)
                                    }
                                />
                            </Col>
                        ))}
                    </Row>
                )}

                {!cargando &&
                    !error &&
                    nutricionistas.length === 0 && (
                        <Alert variant="info">
                            No hay nutricionistas disponibles.
                        </Alert>
                    )}
            </Container>
        </PlantillaPublica>
    );
}

export default Nutricionistas;
