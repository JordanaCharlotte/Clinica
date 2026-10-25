// Formulario del admin para crear o editar usuarios (se usa en UsuarioFormulario).
import CampoFormulario from '../molecules/CampoFormulario';
import useFormulario from '../../hooks/useFormulario';
import { formatearRun, sugerirCorreo, validarUsuario } from '../../utils/validaciones';

const VACIO = { run: '', nombre: '', apellidos: '', correo: '', telefono: '', rol: 'cliente', password: '' };

// Formulario del admin para crear o editar usuarios.
// onGuardar(datos) devuelve { ok, error, campo } del authService.
export default function FormularioUsuario({ usuarioInicial, onGuardar, onCancelar, textoBoton = 'Guardar' }) {
  const esEdicion = Boolean(usuarioInicial);
  const { valores, setValores, errores, setErrores, manejarCambio, manejarBlur, validarTodo } = useFormulario(
    usuarioInicial ? { ...VACIO, ...usuarioInicial, password: '' } : VACIO,
    (datos) => validarUsuario(datos, { esEdicion }),
  );
  const sugerencia = sugerirCorreo(valores.correo);

  // Si el servicio responde que el correo o RUN ya existe, se marca ese campo en rojo.
  function manejarEnvio(evento) {
    evento.preventDefault();
    if (!validarTodo()) return;
    const resultado = onGuardar(valores);
    if (resultado && !resultado.ok && resultado.campo) {
      setErrores({ ...errores, [resultado.campo]: resultado.error });
    }
  }

  return (
    <form onSubmit={manejarEnvio} noValidate>
      <div className="row g-0 g-md-3">
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-nombre" name="nombre" label="Nombre" value={valores.nombre} onChange={manejarCambio}
            onBlur={manejarBlur} error={errores.nombre} required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-apellidos" name="apellidos" label="Apellidos" value={valores.apellidos}
            onChange={manejarCambio} onBlur={manejarBlur} error={errores.apellidos} required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-run" name="run" label="RUN" value={valores.run} onChange={manejarCambio}
            onBlur={(e) => { setValores({ ...valores, run: formatearRun(valores.run) }); manejarBlur(e); }}
            error={errores.run} placeholder="12.345.678-5" maxLength={12} required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-telefono" name="telefono" type="tel" label="Celular (opcional)"
            value={valores.telefono} onChange={manejarCambio} onBlur={manejarBlur} error={errores.telefono} />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-correo" name="correo" type="email" label="Correo" value={valores.correo}
            onChange={manejarCambio} onBlur={manejarBlur} error={errores.correo} sugerencia={sugerencia}
            onAceptarSugerencia={() => setValores({ ...valores, correo: sugerencia })} autoComplete="off" required />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-rol" name="rol" type="select" label="Rol" value={valores.rol}
            onChange={manejarCambio} onBlur={manejarBlur} error={errores.rol} required
            opciones={[{ valor: 'cliente', texto: 'Cliente' }, { valor: 'admin', texto: 'Administrador' }]} />
        </div>
        <div className="col-12 col-md-6">
          <CampoFormulario id="usr-password" name="password" type="password"
            label={esEdicion ? 'Nueva contraseña (opcional)' : 'Contraseña'} value={valores.password}
            onChange={manejarCambio} onBlur={manejarBlur} error={errores.password}
            ayuda={esEdicion ? 'Déjala vacía para mantener la actual.' : 'Entre 6 y 20 caracteres, con letras y números.'}
            autoComplete="new-password" required={!esEdicion} />
        </div>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-2">
        <button type="submit" className="btn btn-primary">
          {textoBoton}
        </button>
        {onCancelar && (
          <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
