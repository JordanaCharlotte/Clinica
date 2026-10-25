// Formulario para crear cuenta. Al registrarse, la persona queda con sesión iniciada.
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CampoFormulario from '../molecules/CampoFormulario';
import Alerta from '../atoms/Alerta';
import { useAuth } from '../../context/AuthContext';
import useFormulario from '../../hooks/useFormulario';
import { formatearRun, fuerzaPassword, sugerirCorreo, validarRegistro } from '../../utils/validaciones';

// Valores con los que parte el formulario.
const INICIAL = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  telefono: '',
  password: '',
  confirmarPassword: '',
  aceptaTerminos: false,
};

// Color del texto según qué tan segura es la contraseña.
const COLOR_FUERZA = { débil: 'danger', media: 'warning', fuerte: 'success' };

export default function RegistroForm() {
  const { registrar } = useAuth();
  const navigate = useNavigate();
  const [errorGeneral, setErrorGeneral] = useState('');
  const { valores, setValores, errores, setErrores, manejarCambio, manejarBlur, validarTodo } = useFormulario(
    INICIAL,
    validarRegistro,
  );

  const sugerencia = sugerirCorreo(valores.correo);
  const fuerza = valores.password ? fuerzaPassword(valores.password) : null;

  // Al salir del RUN se le da formato 12.345.678-5.
  function blurRun(evento) {
    setValores({ ...valores, run: formatearRun(valores.run) });
    manejarBlur(evento);
  }

  // Valida todo, registra y manda al inicio con un mensaje de bienvenida.
  function manejarEnvio(evento) {
    evento.preventDefault();
    setErrorGeneral('');
    if (!validarTodo()) {
      setErrorGeneral('Revisa los campos marcados en rojo.');
      return;
    }
    const resultado = registrar(valores);
    if (!resultado.ok) {
      // Correo o RUN repetido: el error se muestra en el campo que corresponde.
      if (resultado.campo) setErrores({ ...errores, [resultado.campo]: resultado.error });
      else setErrorGeneral(resultado.error);
      return;
    }
    navigate('/', { replace: true, state: { mensaje: `¡Bienvenida/o, ${resultado.usuario.nombre}! Tu cuenta fue creada.` } });
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de registro">
      <Alerta tipo="danger" onCerrar={() => setErrorGeneral('')}>
        {errorGeneral}
      </Alerta>

      <div className="row g-0 g-md-3">
        <div className="col-12 col-md-6">
          <CampoFormulario id="reg-nombre" name="nombre" label="Nombre" value={valores.nombre} onChange={manejarCambio}
            onBlur={manejarBlur} error={errores.nombre} autoComplete="given-name" required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="reg-apellidos" name="apellidos" label="Apellidos" value={valores.apellidos}
            onChange={manejarCambio} onBlur={manejarBlur} error={errores.apellidos} autoComplete="family-name" required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="reg-run" name="run" label="RUN" value={valores.run} onChange={manejarCambio}
            onBlur={blurRun} error={errores.run} ayuda="Con dígito verificador, por ejemplo 12.345.678-5."
            placeholder="12.345.678-5" maxLength={12} required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="reg-telefono" name="telefono" type="tel" label="Celular (opcional)"
            value={valores.telefono} onChange={manejarCambio} onBlur={manejarBlur} error={errores.telefono}
            autoComplete="tel" placeholder="+56 9 1234 5678" />
        </div>
      </div>

      <CampoFormulario id="reg-correo" name="correo" type="email" label="Correo electrónico" value={valores.correo}
        onChange={manejarCambio} onBlur={manejarBlur} error={errores.correo} sugerencia={sugerencia}
        onAceptarSugerencia={() => setValores({ ...valores, correo: sugerencia })} autoComplete="email"
        placeholder="nombre@correo.cl" required />

      <div className="row g-0 g-md-3">
        <div className="col-12 col-md-6">
          <CampoFormulario id="reg-password" name="password" type="password" label="Contraseña"
            value={valores.password} onChange={manejarCambio} onBlur={manejarBlur} error={errores.password}
            ayuda="Entre 6 y 20 caracteres, con letras y números." autoComplete="new-password" required />
          {fuerza && !errores.password && (
            <p className={`small text-${COLOR_FUERZA[fuerza]} mb-3`} aria-live="polite">
              Seguridad de la contraseña: {fuerza}
            </p>
          )}
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="reg-confirmar" name="confirmarPassword" type="password" label="Repite la contraseña"
            value={valores.confirmarPassword} onChange={manejarCambio} onBlur={manejarBlur}
            error={errores.confirmarPassword} autoComplete="new-password" required />
        </div>
      </div>

      <CampoFormulario id="reg-terminos" name="aceptaTerminos" type="checkbox" value={valores.aceptaTerminos}
        onChange={manejarCambio} onBlur={manejarBlur} error={errores.aceptaTerminos}
        label="Acepto los términos y el tratamiento de mis datos." />

      <button type="submit" className="btn btn-primary w-100">
        Crear cuenta
      </button>
      <p className="text-center mt-3 mb-0 small">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
}
