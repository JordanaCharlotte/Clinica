import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { CampoFormulario } from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';
import { useState } from 'react';

function LoginForm() {
    const navegar = useNavigate();
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');


    function manejarEnvio(e) {
        e.preventDefault();
        navegar('/catalogo');
    }

    return (
        <Form onSubmit={manejarEnvio}>
            <CampoFormulario
                controlId="correo"
                label="Correo"
                tipo="email"
                valor={correo}
                onChange={setCorreo}
                error=""
            />
            <CampoFormulario
                controlId="correo"
                label="Correo"
                tipo="text"
                valor={nombre}
                onChange={setNombre}
                error=""
            />
            <Boton texto="Continuar" />
        </Form>
    );
}

export default LoginForm;