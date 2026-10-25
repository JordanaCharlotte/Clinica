// Página de reportes: citas por estado y nutricionista, ingresos por servicio y descarga en CSV.
import { useState } from 'react';
import { obtenerUsuarios } from '../../services/authService';
import { campo, obtenerCitas, obtenerServicios } from '../../services/fuentesDatos';
import { aCSV, contarPor, formatearCLP, ingresosPor, ingresosTotales } from '../../services/reporteService';

// Barra horizontal simple con Bootstrap (sin librerías de gráficos).
function Barras({ titulo, filas, formato = (f) => f.cantidad, valor = (f) => f.cantidad }) {
  const maximo = Math.max(1, ...filas.map(valor));
  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h2 className="h6">{titulo}</h2>
        {filas.length === 0 && <p className="small text-body-secondary mb-0">Sin datos todavía.</p>}
        {filas.map((f) => (
          <div key={f.etiqueta} className="mb-2">
            <div className="d-flex justify-content-between small">
              <span className="text-capitalize">{f.etiqueta}</span>
              <span className="fw-semibold">{formato(f)}</span>
            </div>
            <div className="progress" role="progressbar" aria-label={f.etiqueta} aria-valuenow={valor(f)}
              aria-valuemin={0} aria-valuemax={maximo} style={{ height: 8 }}>
              <div className="progress-bar" style={{ width: `${(valor(f) / maximo) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Reportes() {
  const todasLasCitas = obtenerCitas();
  const servicios = obtenerServicios();
  const usuarios = obtenerUsuarios();
  const [nutricionista, setNutricionista] = useState('todos');

  const nombresNutricionistas = [...new Set(todasLasCitas.map(campo.nutricionistaCita))];
  const citas =
    nutricionista === 'todos' ? todasLasCitas : todasLasCitas.filter((c) => campo.nutricionistaCita(c) === nutricionista);

  const porEstado = contarPor(citas, campo.estadoCita);
  const porNutricionista = contarPor(citas, campo.nutricionistaCita);
  const ingresosServicio = ingresosPor(citas, campo.servicioCita);
  const serviciosPorCategoria = contarPor(servicios, campo.categoriaServicio);
  const usuariosPorRol = contarPor(usuarios, (u) => u.rol);

  // Arma un archivo CSV con las citas filtradas y lo descarga.
  function descargarCSV() {
    const filas = citas.map((c) => ({
      numero: campo.numeroCita(c),
      paciente: campo.clienteCita(c),
      servicio: campo.servicioCita(c),
      nutricionista: campo.nutricionistaCita(c),
      fecha: campo.fechaCita(c),
      estado: campo.estadoCita(c),
      total: campo.totalCita(c),
    }));
    // BOM para que Excel reconozca los acentos.
    const blob = new Blob(['﻿' + aCSV(filas)], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = 'reporte-citas.csv';
    enlace.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
        <h1 className="h3 mb-0">Reportes</h1>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <label htmlFor="filtro-nutricionista" className="visually-hidden">
            Filtrar por nutricionista
          </label>
          <select id="filtro-nutricionista" className="form-select" value={nutricionista}
            onChange={(e) => setNutricionista(e.target.value)}>
            <option value="todos">Todos los nutricionistas</option>
            {nombresNutricionistas.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-outline-primary text-nowrap" onClick={descargarCSV} disabled={!citas.length}>
            Descargar CSV
          </button>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="small text-body-secondary mb-1">Solicitudes</p>
              <p className="h3 mb-0">{citas.length}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="small text-body-secondary mb-1">Ingresos estimados</p>
              <p className="h3 mb-0">{formatearCLP(ingresosTotales(citas))}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <p className="small text-body-secondary mb-1">Ticket promedio</p>
              <p className="h3 mb-0">{formatearCLP(citas.length ? ingresosTotales(citas) / citas.length : 0)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-6">
          <Barras titulo="Solicitudes por estado" filas={porEstado} formato={(f) => `${f.cantidad} (${f.porcentaje}%)`} />
        </div>
        <div className="col-12 col-lg-6">
          <Barras titulo="Solicitudes por nutricionista" filas={porNutricionista} />
        </div>
        <div className="col-12 col-lg-6">
          <Barras titulo="Ingresos por servicio" filas={ingresosServicio} valor={(f) => f.monto} formato={(f) => formatearCLP(f.monto)} />
        </div>
        <div className="col-12 col-lg-3">
          <Barras titulo="Servicios por categoría" filas={serviciosPorCategoria} />
        </div>
        <div className="col-12 col-lg-3">
          <Barras titulo="Usuarios por rol" filas={usuariosPorRol} />
        </div>
      </div>
    </>
  );
}
