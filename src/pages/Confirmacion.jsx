import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import { PlantillaPublica } from '../components/templates/PlantillaPublica';
import { CampoFormulario } from '../components/molecules/CampoFormulario';
import Boton from '../components/atoms/Boton';
import { useCita } from '../context/CitaContext';
import { useAuth } from '../context/AuthContext';
import { citasDeUsuario, guardarCita } from '../services/citaService';
import { listarServicios } from '../services/servicioService';
import { listarNutricionistas } from '../services/nutricionistaService';
import { validarTeleconsulta } from '../utils/reglasCita';
import {
    validarObligatorio,
    validarCorreo,
} from '../utils/validacionesCita';
import { formatoPrecio } from '../utils/formatoPrecio';

function Confirmacion() {
    const navigate = useNavigate();
    const { usuario } = useAuth();
    const { citaEnCurso, reiniciarCita } = useCita();
    const datos = citaEnCurso ?? {};

    const [servicios, setServicios] = useState([]);
    const [nutricionistas, setNutricionistas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState('');

    const [nombre, setNombre] = useState(
        usuario
            ? `${usuario.nombre} ${usuario.apellidos ?? ''}`.trim()
            : '',
    );
    const [correo, setCorreo] = useState(usuario?.correo ?? '');
    const [errorNombre, setErrorNombre] = useState('');
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorRegla, setErrorRegla] = useState('');

    useEffect(() => {
        async function cargarCatalogos() {
            try {
                setCargando(true);
                setErrorCarga('');

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
                setErrorCarga(
                    'No se pudieron cargar los datos del servicio y del nutricionista.',
                );
            } finally {
                setCargando(false);
            }
        }

        cargarCatalogos();
    }, []);

    const servicio = servicios.find(
        (item) => String(item.id) === String(datos.servicioId),
    );

    const nutricionista = nutricionistas.find(
        (item) => String(item.id) === String(datos.nutricionistaId),
    );

    if (cargando) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <Spinner animation="border" />
                    <p className="mt-2">Cargando datos de la cita...</p>
                </Container>
            </PlantillaPublica>
        );
    }

    if (errorCarga) {
        return (
            <PlantillaPublica>
                <Container className="mt-5">
                    <Alert variant="danger">{errorCarga}</Alert>
                </Container>
            </PlantillaPublica>
        );
    }

    if (!servicio || !nutricionista) {
        return (
            <PlantillaPublica>
                <Container className="mt-5 text-center">
                    <p>No hay una solicitud en curso.</p>
                    <Boton
                        texto="Agendar cita"
                        onClick={() => navigate('/agendar')}
                    />
                </Container>
            </PlantillaPublica>
        );
    }

    async function confirmar(evento) {
        evento.preventDefault();

        const errN = validarObligatorio(
            nombre,
            'El nombre es obligatorio',
        );
        const errC = validarCorreo(correo);

        setErrorNombre(errN);
        setErrorCorreo(errC);
        setErrorRegla('');

        if (errN !== '' || errC !== '') {
            return;
        }

        const previas = citasDeUsuario(correo).map((cita) => ({
            ...cita,
            servicioId:
                servicios.find(
                    (item) =>
                        String(item.id) === String(cita.servicioId),
                )?.codigo ?? cita.servicioId,
        }));

        const errR = validarTeleconsulta(servicio.codigo, previas);
        setErrorRegla(errR);

        if (errR !== '') {
            return;
        }

        const cita = await guardarCita({
            ...datos,
            servicioId: servicio.id,
            nutricionistaId: nutricionista.id,
            nombre,
            correo,
            servicioNombre: servicio.nombre,
            precio: servicio.precio,
            nutricionistaNombre: nutricionista.nombre,
        });

        reiniciarCita();
        navigate(`/resultado/${cita.id}`);
    }

    return (
        <PlantillaPublica>
            <Container
                className="mt-5 mb-5"
                style={{ maxWidth: 600 }}
            >
                <ul className="list-unstyled mb-4">
                    <li>
                        <strong>Servicio:</strong>{' '}
                        {servicio.nombre} (
                        {formatoPrecio(servicio.precio)})
                    </li>
                    <li>
                        <strong>Nutricionista:</strong>{' '}
                        {nutricionista.nombre}
                    </li>
                    <li>
                        <strong>Fecha y hora:</strong>{' '}
                        {datos.fecha} a las {datos.hora}
                    </li>
                </ul>

                {usuario && (
                    <p className="small text-body-secondary">
                        Completamos tus datos con tu cuenta. Puedes
                        cambiarlos si lo necesitas.
                    </p>
                )}

                <Form noValidate onSubmit={confirmar}>
                    <CampoFormulario
                        controlId="nombre"
                        etiqueta="Nombre"
                        tipo="text"
                        valor={nombre}
                        onChange={setNombre}
                        error={errorNombre}
                    />

                    <CampoFormulario
                        controlId="correo"
                        etiqueta="Correo"
                        tipo="email"
                        valor={correo}
                        onChange={setCorreo}
                        error={errorCorreo}
                    />

                    {errorRegla !== '' && (
                        <p className="text-danger">{errorRegla}</p>
                    )}

                    <Boton texto="Confirmar cita" />
                </Form>
            </Container>
        </PlantillaPublica>
    );
}

export default Confirmacion;
