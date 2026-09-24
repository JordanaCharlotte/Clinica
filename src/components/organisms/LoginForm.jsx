import Form from 'react-bootstrap/Form';
import CampoFormulario from '../molecules/CampoFormulario';
import Boton from '../atoms/Boton';

function LoginForm() {
    return (
        <Form onSubmit={(e) => e.preventDefault()}>
            <CampoFormulario
                controlId="correo"
                label="Correo"
                type="email"
                placeholder="tucorreo@ejemplo.com"
            />
            <CampoFormulario
                controlId="Nombre"
                label="Nombre"
                type="text"
                placeholder="Tu nombre"
            />
            <Boton texto="Continuar" />
        </Form>
    );
}

export default LoginForm;