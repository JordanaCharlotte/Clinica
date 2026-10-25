import { Link, useNavigate, useParams } from 'react-router-dom';
import FormularioUsuario from '../../components/organisms/FormularioUsuario';
import { actualizarUsuario, crearUsuario, obtenerUsuarioPorId } from '../../services/authService';

// Misma página para /admin/usuarios/nuevo y /admin/usuarios/:id/editar.
export default function UsuarioFormulario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const esEdicion = Boolean(id);
  const usuario = esEdicion ? obtenerUsuarioPorId(id) : null;

  if (esEdicion && !usuario) {
    return (
      <div className="text-center py-5">
        <h1 className="h4">Usuario no encontrado</h1>
        <Link to="/admin/usuarios" className="btn btn-primary mt-2">
          Volver a usuarios
        </Link>
      </div>
    );
  }

  // Crea o actualiza según la URL. Si sale bien, vuelve al listado con un mensaje.
  function guardar(datos) {
    const resultado = esEdicion ? actualizarUsuario(id, datos) : crearUsuario(datos);
    if (resultado.ok) {
      navigate('/admin/usuarios', {
        state: { mensaje: esEdicion ? 'Cambios guardados.' : `Usuario ${resultado.usuario.correo} creado.` },
      });
    }
    return resultado;
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {esEdicion ? 'Editar' : 'Nuevo'}
          </li>
        </ol>
      </nav>
      <h1 className="h3 mb-3">{esEdicion ? `Editar a ${usuario.nombre}` : 'Nuevo usuario'}</h1>
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <FormularioUsuario
            usuarioInicial={usuario}
            onGuardar={guardar}
            onCancelar={() => navigate('/admin/usuarios')}
            textoBoton={esEdicion ? 'Guardar cambios' : 'Crear usuario'}
          />
        </div>
      </div>
    </>
  );
}
