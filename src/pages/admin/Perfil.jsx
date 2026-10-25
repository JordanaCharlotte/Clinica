// Página "Mi perfil": la persona cambia su nombre, teléfono o contraseña.
import { useState } from 'react';
import CampoFormulario from '../../components/molecules/CampoFormulario';
import Alerta from '../../components/atoms/Alerta';
import { useAuth } from '../../context/AuthContext';
import useFormulario from '../../hooks/useFormulario';
import { validarPerfil } from '../../utils/validaciones';

export default function Perfil() {
  const { usuario, actualizarPerfil } = useAuth();
  const [mensaje, setMensaje] = useState(null);
  const { valores, errores, manejarCambio, manejarBlur, validarTodo, setValores } = useFormulario(
    {
      nombre: usuario?.nombre ?? '',
      apellidos: usuario?.apellidos ?? '',
      telefono: usuario?.telefono ?? '',
      password: '',
      confirmarPassword: '',
    },
    validarPerfil,
  );

  // confirmarPassword solo sirve para validar, por eso no se manda a guardar.
  function manejarEnvio(evento) {
    evento.preventDefault();
    setMensaje(null);
    if (!validarTodo()) return;
    const { confirmarPassword: _c, ...cambios } = valores;
    const resultado = actualizarPerfil(cambios);
    if (resultado.ok) {
      setMensaje({ tipo: 'success', texto: 'Tu perfil se actualizó.' });
      setValores({ ...valores, password: '', confirmarPassword: '' });
    } else {
      setMensaje({ tipo: 'danger', texto: resultado.error });
    }
  }

  return (
    <>
      <h1 className="h3 mb-3">Mi perfil</h1>
      <div className="row g-4">
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h5 mb-3">Cuenta</h2>
              <p className="mb-1">
                <span className="text-body-secondary">Correo:</span> {usuario?.correo}
              </p>
              <p className="mb-1">
                <span className="text-body-secondary">RUN:</span> {usuario?.run}
              </p>
              <p className="mb-0">
                <span className="text-body-secondary">Rol:</span>{' '}
                <span className="badge text-bg-dark">{usuario?.rol}</span>
              </p>
              <p className="small text-body-secondary mt-3 mb-0">El correo, el RUN y el rol solo los cambia otro administrador.</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              {mensaje && (
                <Alerta tipo={mensaje.tipo} onCerrar={() => setMensaje(null)}>
                  {mensaje.texto}
                </Alerta>
              )}
              <form onSubmit={manejarEnvio} noValidate>
                <div className="row g-0 g-md-3">
                  <div className="col-12 col-md-6">
                    <CampoFormulario id="perfil-nombre" name="nombre" label="Nombre" value={valores.nombre}
                      onChange={manejarCambio} onBlur={manejarBlur} error={errores.nombre} required />
                  </div>
                  <div className="col-12 col-md-6">
                    <CampoFormulario id="perfil-apellidos" name="apellidos" label="Apellidos" value={valores.apellidos}
                      onChange={manejarCambio} onBlur={manejarBlur} error={errores.apellidos} required />
                  </div>
                </div>
                <CampoFormulario id="perfil-telefono" name="telefono" type="tel" label="Celular (opcional)"
                  value={valores.telefono} onChange={manejarCambio} onBlur={manejarBlur} error={errores.telefono} />
                <h2 className="h6 mt-2">Cambiar contraseña</h2>
                <div className="row g-0 g-md-3">
                  <div className="col-12 col-md-6">
                    <CampoFormulario id="perfil-password" name="password" type="password" label="Nueva contraseña"
                      value={valores.password} onChange={manejarCambio} onBlur={manejarBlur} error={errores.password}
                      ayuda="Déjala vacía para mantener la actual." autoComplete="new-password" />
                  </div>
                  <div className="col-12 col-md-6">
                    <CampoFormulario id="perfil-confirmar" name="confirmarPassword" type="password"
                      label="Repite la contraseña" value={valores.confirmarPassword} onChange={manejarCambio}
                      onBlur={manejarBlur} error={errores.confirmarPassword} autoComplete="new-password" />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
