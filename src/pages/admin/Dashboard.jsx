// Página principal del panel admin: tarjetas con totales y últimas solicitudes.
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { obtenerUsuarios } from '../../services/authService';
import { campo, obtenerCitas, obtenerNutricionistas, obtenerServicios } from '../../services/fuentesDatos';
import { formatearCLP, resumenDashboard, ultimasCitas } from '../../services/reporteService';

// Tarjeta con un número grande y un enlace opcional.
function Tarjeta({ titulo, valor, detalle, enlace }) {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="card tarjeta-metrica h-100">
        <div className="card-body">
          <p className="text-body-secondary small mb-1">{titulo}</p>
          <p className="h2 mb-1">{valor}</p>
          {detalle && <p className="small text-body-secondary mb-2">{detalle}</p>}
          {enlace && (
            <Link to={enlace.to} className="small">
              {enlace.texto}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { usuario } = useAuth();
  // Lee los datos de los tres módulos: usuarios (Jordana), servicios (Davis) y citas (Vicente).
  const usuarios = obtenerUsuarios();
  const servicios = obtenerServicios();
  const citas = obtenerCitas();
  const nutricionistas = obtenerNutricionistas();
  const r = resumenDashboard({ usuarios, servicios, citas, nutricionistas });
  const recientes = ultimasCitas(citas, 5);

  return (
    <>
      <h1 className="h3">Dashboard</h1>
      <p className="text-body-secondary">Hola, {usuario?.nombre}. Este es el resumen de la clínica.</p>

      <div className="row g-3 mb-4">
        <Tarjeta titulo="Usuarios" valor={r.totalUsuarios} detalle={`${r.totalClientes} clientes · ${r.totalAdmins} admin`}
          enlace={{ to: '/admin/usuarios', texto: 'Gestionar usuarios' }} />
        <Tarjeta titulo="Servicios" valor={r.totalServicios} detalle={`${r.totalNutricionistas} nutricionistas`} />
        <Tarjeta titulo="Solicitudes de cita" valor={r.totalCitas} detalle={`${r.citasPendientes} por confirmar`} />
        <Tarjeta titulo="Ingresos estimados" valor={formatearCLP(r.ingresos)} detalle="Sin contar canceladas"
          enlace={{ to: '/admin/reportes', texto: 'Ver reportes' }} />
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h5">Últimas solicitudes</h2>
          {recientes.length === 0 ? (
            <p className="text-body-secondary mb-0">Todavía no hay solicitudes de cita.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th scope="col">N°</th>
                    <th scope="col">Paciente</th>
                    <th scope="col" className="d-none d-md-table-cell">Servicio</th>
                    <th scope="col" className="d-none d-md-table-cell">Nutricionista</th>
                    <th scope="col">Estado</th>
                    <th scope="col" className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {recientes.map((c, i) => (
                    <tr key={campo.numeroCita(c) + String(i)}>
                      <td>{campo.numeroCita(c)}</td>
                      <td>{campo.clienteCita(c)}</td>
                      <td className="d-none d-md-table-cell">{campo.servicioCita(c)}</td>
                      <td className="d-none d-md-table-cell">{campo.nutricionistaCita(c)}</td>
                      <td>
                        <span className="badge text-bg-light text-capitalize">{campo.estadoCita(c)}</span>
                      </td>
                      <td className="text-end">{formatearCLP(campo.totalCita(c))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
