// Cálculos del Dashboard y de Reportes. Funciones puras: reciben las listas
// y devuelven números o filas listas para mostrar.

import { campo } from './fuentesDatos';

// Muestra un número como peso chileno: 35000 -> $35.000
export function formatearCLP(monto) {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(
    Number(monto) || 0,
  );
}

// Cuenta elementos por una clave y devuelve [{ etiqueta, cantidad, porcentaje }] de mayor a menor.
export function contarPor(lista, obtenerClave) {
  const conteo = new Map();
  for (const item of lista) {
    const clave = obtenerClave(item);
    conteo.set(clave, (conteo.get(clave) ?? 0) + 1);
  }
  const total = lista.length || 1;
  return [...conteo.entries()]
    .map(([etiqueta, cantidad]) => ({ etiqueta: String(etiqueta), cantidad, porcentaje: Math.round((cantidad / total) * 100) }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

// Citas canceladas o rechazadas no suman ingresos.
const ESTADOS_SIN_INGRESO = ['cancelada', 'rechazada', 'anulada'];

// Suma el total de todas las citas que no están canceladas.
export function ingresosTotales(citas) {
  return citas
    .filter((c) => !ESTADOS_SIN_INGRESO.includes(campo.estadoCita(c)))
    .reduce((suma, c) => suma + campo.totalCita(c), 0);
}

// Suma los ingresos agrupados (por servicio, por nutricionista, etc.).
export function ingresosPor(citas, obtenerClave) {
  const montos = new Map();
  for (const c of citas) {
    if (ESTADOS_SIN_INGRESO.includes(campo.estadoCita(c))) continue;
    const clave = obtenerClave(c);
    montos.set(clave, (montos.get(clave) ?? 0) + campo.totalCita(c));
  }
  return [...montos.entries()]
    .map(([etiqueta, monto]) => ({ etiqueta: String(etiqueta), monto }))
    .sort((a, b) => b.monto - a.monto);
}

// Calcula los números de las tarjetas del Dashboard.
export function resumenDashboard({ usuarios = [], servicios = [], citas = [], nutricionistas = [] }) {
  const pendientes = citas.filter((c) => ['pendiente', 'en curso', 'solicitada'].includes(campo.estadoCita(c))).length;
  return {
    totalUsuarios: usuarios.length,
    totalClientes: usuarios.filter((u) => u.rol === 'cliente').length,
    totalAdmins: usuarios.filter((u) => u.rol === 'admin').length,
    totalServicios: servicios.length,
    totalNutricionistas: nutricionistas.length,
    totalCitas: citas.length,
    citasPendientes: pendientes,
    ingresos: ingresosTotales(citas),
  };
}

// Ordena las citas de la más nueva a la más antigua y toma las primeras.
export function ultimasCitas(citas, cantidad = 5) {
  return [...citas]
    .sort((a, b) => String(campo.fechaCita(b)).localeCompare(String(campo.fechaCita(a))))
    .slice(0, cantidad);
}

// Convierte filas [{...}] a CSV (separador ; para que Excel en español lo abra bien).
export function aCSV(filas) {
  if (!filas.length) return '';
  const columnas = Object.keys(filas[0]);
  const escapar = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  return [columnas.map(escapar).join(';'), ...filas.map((f) => columnas.map((c) => escapar(f[c])).join(';'))].join('\n');
}
