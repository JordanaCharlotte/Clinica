// Formulario de inicio de sesión. Los errores se muestran bajo cada campo, sin alert().
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Alerta from '../atoms/Alerta';
import { useAuth } from '../../context/AuthContext';
import useFormulario from '../../hooks/useFormulario';
import { sugerirCorreo, validarLogin } from '../../utils/validaciones';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorGeneral, setErrorGeneral] = useState('');
  const [verPassword, setVerPassword] = useState(false);
  const { valores, setValores, errores, manejarCambio, manejarBlur, validarTodo } = useFormulario(
    { correo: '', password: '' },
    validarLogin,
  );

  // Si el correo parece mal escrito, se ofrece la corrección.
  const sugerencia = sugerirCorreo(valores.correo);

  // Al enviar: valida, intenta iniciar sesión y si sale bien redirige.
  function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorGeneral('');
    if (!validarTodo()) return;

    const resultado = login(valores.correo, valores.password);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      return;
    }
    // Si venía de una página protegida, vuelve ahí; si es admin, al panel.
    const destino = location.state?.desde ?? (resultado.usuario.rol === 'admin' ? '/admin' : '/');
    navigate(destino, { replace: true });
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de inicio de sesión">
      <Alerta tipo="danger" onCerrar={() => setErrorGeneral('')}>
        {errorGeneral}
      </Alerta>

      <CampoFormulario
        id="login-correo"
        name="correo"
        type="email"
        label="Correo electrónico"
        value={valores.correo}
        onChange={manejarCambio}
        onBlur={manejarBlur}
        error={errores.correo}
        sugerencia={sugerencia}
        onAceptarSugerencia={() => setValores({ ...valores, correo: sugerencia })}
        autoComplete="email"
        placeholder="nombre@correo.cl"
        required
      />

      <CampoFormulario
        id="login-password"
        name="password"
        type={verPassword ? 'text' : 'password'}
        label="Contraseña"
        value={valores.password}
        onChange={manejarCambio}
        onBlur={manejarBlur}
        error={errores.password}
        autoComplete="current-password"
        required
      >
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setVerPassword(!verPassword)}
          aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {verPassword ? 'Ocultar' : 'Ver'}
        </button>
      </CampoFormulario>

      <button type="submit" className="btn btn-primary w-100">
        Iniciar sesión
      </button>

      <p className="text-center mt-3 mb-0 small">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </form>
  );
}
