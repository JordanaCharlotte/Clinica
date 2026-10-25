// Página /admin/usuarios/:id: datos del usuario y sus citas.
import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import { obtenerUsuarioPorId } from '../../services/authService';
import { campo, obtenerCitas } from '../../services/fuentesDatos';

export default function UsuarioDetalle() {
  const { id } = useParams();
  const usuario = obtenerUsuarioPorId(id);

  if (!usuario) {
    return (
      <div className="text-center py-5">
        <h1 className="h4">Usuario no encontrado</h1>
        <Link to="/admin/usuarios" className="btn btn-primary mt-2">
          Volver a usuarios
        </Link>
      </div>
    );
  }

  // Citas de este usuario (se comparan por correo).
  const citas = obtenerCitas().filter((c) => {
    const correo = c?.correo ?? c?.paciente?.correo ?? c?.persona?.correo ?? c?.cliente?.correo;
    return String(correo ?? '').toLowerCase() === usuario.correo;
  });

  const filas = [
    ['RUN', usuario.run],
    ['Correo', usuario.correo],
    ['Celular', usuario.telefono || 'No registrado'],
    ['Rol', usuario.rol],
  ];

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {usuario.nombre}
          </li>
        </ol>
      </nav>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
        <h1 className="h3 mb-0">
          {usuario.nombre} {usuario.apellidos}
        </h1>
        <Link to={`/admin/usuarios/${usuario.id}/editar`} className="btn btn-outline-primary">
          Editar
        </Link>
      </div>

      <div className="row g-4">
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5">Datos</h2>
              <dl className="row mb-0">
                {filas.map(([etiqueta, valor]) => (
                  <Fragment key={etiqueta}>
                    <dt className="col-4 text-body-secondary">{etiqueta}</dt>
                    <dd className="col-8 text-break">{valor}</dd>
                  </Fragment>
                ))}
              </dl>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h2 className="h5">Solicitudes de cita</h2>
              <p className="display-6 mb-1">{citas.length}</p>
              <p className="text-body-secondary small mb-0">
                {citas.length ? `Última: ${campo.servicioCita(citas[citas.length - 1])}` : 'Todavía no tiene solicitudes.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}