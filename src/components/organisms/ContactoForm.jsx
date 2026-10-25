// Formulario de contacto. Si hay sesión, el nombre y correo ya vienen llenos.
import { useState } from 'react';
import CampoFormulario from '../molecules/CampoFormulario';
import Alerta from '../atoms/Alerta';
import { useAuth } from '../../context/AuthContext';
import useFormulario from '../../hooks/useFormulario';
import { ASUNTOS_CONTACTO, MAX_MENSAJE, sugerirCorreo, validarContacto } from '../../utils/validaciones';

// onEnviar(datos) se recibe por props: la página decide qué hacer con el mensaje.
export default function ContactoForm({ onEnviar }) {
  const { usuario } = useAuth();
  const [enviado, setEnviado] = useState(false);
  const inicial = {
    nombre: usuario ? `${usuario.nombre}` : '',
    correo: usuario?.correo ?? '',
    asunto: '',
    mensaje: '',
  };
  const { valores, setValores, errores, manejarCambio, manejarBlur, validarTodo, reiniciar } = useFormulario(
    inicial,
    validarContacto,
  );
  const sugerencia = sugerirCorreo(valores.correo);
  const caracteres = valores.mensaje.length;

  // Si está todo bien, entrega los datos a la página, muestra el aviso y limpia el formulario.
  function manejarEnvio(evento) {
    evento.preventDefault();
    setEnviado(false);
    if (!validarTodo()) return;
    onEnviar?.({ ...valores, mensaje: valores.mensaje.trim() });
    setEnviado(true);
    reiniciar(inicial);
  }

  return (
    <form onSubmit={manejarEnvio} noValidate aria-label="Formulario de contacto">
      {enviado && (
        <Alerta tipo="success" onCerrar={() => setEnviado(false)}>
          Recibimos tu mensaje. Te responderemos al correo indicado en un máximo de 48 horas hábiles.
        </Alerta>
      )}
      <div className="row g-0 g-md-3">
        <div className="col-12 col-md-6">
          <CampoFormulario id="contacto-nombre" name="nombre" label="Nombre" value={valores.nombre}
            onChange={manejarCambio} onBlur={manejarBlur} error={errores.nombre} autoComplete="name" required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="contacto-correo" name="correo" type="email" label="Correo electrónico"
            value={valores.correo} onChange={manejarCambio} onBlur={manejarBlur} error={errores.correo}
            sugerencia={sugerencia} onAceptarSugerencia={() => setValores({ ...valores, correo: sugerencia })}
            autoComplete="email" required />
        </div>
      </div>
      <CampoFormulario id="contacto-asunto" name="asunto" type="select" label="Asunto" value={valores.asunto}
        onChange={manejarCambio} onBlur={manejarBlur} error={errores.asunto} opciones={ASUNTOS_CONTACTO} required />
      <CampoFormulario id="contacto-mensaje" name="mensaje" type="textarea" label="Mensaje" value={valores.mensaje}
        onChange={manejarCambio} onBlur={manejarBlur} error={errores.mensaje} maxLength={MAX_MENSAJE}
        ayuda={`${caracteres}/${MAX_MENSAJE} caracteres (mínimo 10).`} required />
      <button type="submit" className="btn btn-primary">
        Enviar mensaje
      </button>
    </form>
  );
}
