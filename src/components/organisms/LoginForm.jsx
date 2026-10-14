import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

// Funcion que revisa que el correo tenga formato valido (algo@algo.algo)
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

// Funcion que revisa que el nombre tenga al menos 3 letras
function validarNombre(nombre) {
    return nombre.trim().length >= 3;
}

function LoginForm() {
    // Guardo lo que el usuario va escribiendo
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');

    // Guardo los mensajes de error de cada campo
    const [errorCorreo, setErrorCorreo] = useState('');
    const [errorNombre, setErrorNombre] = useState('');

    // Esto me permite cambiar de pagina despues de validar
    const navigate = useNavigate();

    function manejarSubmit(e) {
        e.preventDefault(); // Evito que la pagina se recargue

        let hayError = false;

        if (!validarCorreo(correo)) {
            setErrorCorreo('Ingresa un correo valido');
            hayError = true;
        } else {
            setErrorCorreo('');
        }

        if (!validarNombre(nombre)) {
            setErrorNombre('El nombre debe tener al menos 3 letras');
            hayError = true;
        } else {
            setErrorNombre('');
        }

        // Solo navego si no hubo ningun error
        if (!hayError) {
            navigate('/catalogo');
        }
    }

    return (
        <Form onSubmit={manejarSubmit}>
            <CampoFormulario
                controlId="correo"
                label="Correo"
                type="email"
                placeholder="tucorreo@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                error={errorCorreo}
            />
            <CampoFormulario
                controlId="Nombre"
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                error={errorNombre}
            />
            <Boton texto="Continuar" type="submit" />
        </Form>
    );
}

export default LoginForm;