// Listado de usuarios del admin: buscar, filtrar por rol, ver, editar y eliminar.
import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Alerta from '../../components/atoms/Alerta';
import { useAuth } from '../../context/AuthContext';
import { eliminarUsuario, obtenerUsuarios } from '../../services/authService';

export default function Usuarios() {
  const { usuario: sesion } = useAuth();
  const location = useLocation();
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());
  const [busqueda, setBusqueda] = useState('');
  const [filtroRol, setFiltroRol] = useState('todos');
  const [porEliminar, setPorEliminar] = useState(null);
  const [mensaje, setMensaje] = useState(location.state?.mensaje ? { tipo: 'success', texto: location.state.mensaje } : null);

  // Usuarios que coinciden con la búsqueda (nombre, apellidos, correo o RUN) y el rol elegido.
  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return usuarios.filter((u) => {
      const coincideRol = filtroRol === 'todos' || u.rol === filtroRol;
      const coincideTexto =
        !texto || `${u.nombre} ${u.apellidos} ${u.correo} ${u.run}`.toLowerCase().includes(texto);
      return coincideRol && coincideTexto;
    });
  }, [usuarios, busqueda, filtroRol]);

  // Elimina después de confirmar en pantalla y vuelve a cargar la lista.
  function confirmarEliminar(id) {
    const resultado = eliminarUsuario(id);
    setPorEliminar(null);
    if (!resultado.ok) {
      setMensaje({ tipo: 'danger', texto: resultado.error });
      return;
    }
    setUsuarios(obtenerUsuarios());
    setMensaje({ tipo: 'success', texto: 'Usuario eliminado.' });
  }

  return (
    <>
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-2 mb-3">
        <h1 className="h3 mb-0">Usuarios</h1>
        <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
          Nuevo usuario
        </Link>
      </div>

      {mensaje && (
        <Alerta tipo={mensaje.tipo} onCerrar={() => setMensaje(null)}>
          {mensaje.texto}
        </Alerta>
      )}

      <div className="row g-2 mb-3">
        <div className="col-12 col-md-8">
          <label htmlFor="buscar-usuario" className="visually-hidden">
            Buscar usuario
          </label>
          <input id="buscar-usuario" type="search" className="form-control" placeholder="Buscar por nombre, correo o RUN"
            value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        </div>
        <div className="col-12 col-md-4">
          <label htmlFor="filtro-rol" className="visually-hidden">
            Filtrar por rol
          </label>
          <select id="filtro-rol" className="form-select" value={filtroRol} onChange={(e) => setFiltroRol(e.target.value)}>
            <option value="todos">Todos los roles</option>
            <option value="admin">Administradores</option>
            <option value="cliente">Clientes</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col" className="d-none d-md-table-cell">RUN</th>
              <th scope="col">Correo</th>
              <th scope="col">Rol</th>
              <th scope="col" className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((u) => (
              <tr key={u.id}>
                <td>
                  {u.nombre} {u.apellidos}
                </td>
                <td className="d-none d-md-table-cell">{u.run}</td>
                <td className="text-break">{u.correo}</td>
                <td>
                  <span className={`badge ${u.rol === 'admin' ? 'text-bg-dark' : 'text-bg-secondary'}`}>{u.rol}</span>
                </td>
                <td className="text-end">
                  {porEliminar === u.id ? (
                    <div className="d-inline-flex flex-wrap gap-1 justify-content-end">
                      <span className="small align-self-center me-1">¿Eliminar?</span>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => confirmarEliminar(u.id)}>
                        Sí
                      </button>
                      <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => setPorEliminar(null)}>
                        No
                      </button>
                    </div>
                  ) : (
                    <div className="d-inline-flex flex-wrap gap-1 justify-content-end">
                      <Link to={`/admin/usuarios/${u.id}`} className="btn btn-outline-primary btn-sm">
                        Ver
                      </Link>
                      <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-outline-secondary btn-sm">
                        Editar
                      </Link>
                      {String(u.id) !== String(sesion?.id) && (
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => setPorEliminar(u.id)}>
                          Eliminar
                        </button>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {visibles.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-body-secondary py-4">
                  No hay usuarios que coincidan con la búsqueda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="small text-body-secondary">
        Mostrando {visibles.length} de {usuarios.length} usuarios.
      </p>
    </>
  );
}
