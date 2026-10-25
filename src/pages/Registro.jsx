// Página /registro. Si ya hay sesión iniciada, manda al inicio.
import { Navigate } from 'react-router-dom';
import RegistroForm from '../components/organisms/RegistroForm';
import { useAuth } from '../context/AuthContext';

export default function Registro() {
  const { usuario } = useAuth();
  if (usuario) return <Navigate to="/" replace />;

  return (
    <section className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <RegistroForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
