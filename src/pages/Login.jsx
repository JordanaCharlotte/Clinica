// Página /login: muestra el formulario dentro de una tarjeta.
import { Navigate, useLocation } from 'react-router-dom';
import Alerta from '../components/atoms/Alerta';
import LoginForm from '../components/organisms/LoginForm';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { usuario, esAdmin } = useAuth();
  const location = useLocation();
  // Si viene desde una página protegida (ej: /agendar), se avisa por qué se pide el login.
  const vieneDeCita = location.state?.desde === '/agendar';
  // Si ya hay sesión, no tiene sentido mostrar el login.
  if (usuario) return <Navigate to={location.state?.desde ?? (esAdmin ? '/admin' : '/')} replace />;

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {vieneDeCita && (
                <Alerta tipo="info">Para agendar tu cita primero inicia sesión o crea una cuenta.</Alerta>
              )}
              <LoginForm />
            </div>
          </div>
          <p className="small text-body-secondary text-center mt-3">
            Cuentas de prueba: admin@clinica.cl / Admin123 · camila@correo.cl / Cliente123
          </p>
        </div>
      </div>
    </section>
  );
}
