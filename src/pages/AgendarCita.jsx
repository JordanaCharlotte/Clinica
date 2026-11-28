import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useLocation, useNavigate } from 'react-router-dom';
import { PlantillaPublica } from '../components/templates/PlantillaPublica';
import FormularioAgendarCita from '../components/organisms/FormularioAgendarCita';
import { useCita } from '../context/CitaContext';
import { listarServicios } from '../services/servicioService';
import { listarNutricionistas } from '../services/nutricionistaService';

const horasDisponibles = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '15:00',
    '16:00',
    '17:00',
];

function AgendarCita() {
    const navigate = useNavigate();
    const location = useLocation();
    const { citaEnCurso, actualizarCita } = useCita();

    const [servicios, setServicios] = useState([]);
    const [nutricionistas, setNutricionistas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function cargarCatalogos() {
            try {
                setCargando(true);
                setError('');

                const [serviciosApi, nutricionistasApi] =
                    await Promise.all([
                        listarServicios(),
                        listarNutricionistas(),
                    ]);

                setServicios(
                    Array.isArray(serviciosApi) ? serviciosApi : [],
                );

                setNutricionistas(
                    Array.isArray(nutricionistasApi)
                        ? nutricionistasApi
                        : [],
                );
            } catch (error) {
                console.error('Error al cargar los catálogos:', error);
                setError(
                    'No se pudieron cargar los servicios y nutricionistas.',
                );
            } finally {
                setCargando(false);
            }
        }

        cargarCatalogos();
    }, []);

    const datosIniciales = {
        ...(citaEnCurso ?? {}),
        ...(location.state ?? {}),
    };

    function continuar(datos) {
        const servicio = servicios.find(
            (item) =>
                String(item.id) === String(datos.servicioId),
        );

        const nutricionista = nutricionistas.find(
            (item) =>
                String(item.id) === String(datos.nutricionistaId),
        );

        actualizarCita({
            ...datos,
            servicioId: servicio?.id ?? datos.servicioId,
            nutricionistaId:
                nutricionista?.id ?? datos.nutricionistaId,
        });

        navigate('/confirmacion');
    }

    if (cargando) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <Spinner animation="border" />
                    <p className="mt-2">
                        Cargando servicios y nutricionistas...
                    </p>
                </Container>
            </PlantillaPublica>
        );
    }

    if (error) {
        return (
            <PlantillaPublica>
                <Container className="mt-5">
                    <Alert variant="danger">{error}</Alert>
                </Container>
            </PlantillaPublica>
        );
    }

    return (
        <PlantillaPublica>
            <Container
                className="mt-5 mb-5"
                style={{ maxWidth: 600 }}
            >
                <FormularioAgendarCita
                    servicios={servicios}
                    nutricionistas={nutricionistas}
                    horas={horasDisponibles}
                    inicial={datosIniciales}
                    onEnviar={continuar}
                />
            </Container>
        </PlantillaPublica>
    );
}

export default AgendarCita;
