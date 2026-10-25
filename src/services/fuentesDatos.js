// Adaptador: único lugar donde el Dashboard, Reportes, Home y Nosotros leen
// datos que crearon Davis (servicios) y Vicente (nutricionistas y citas).
// Se importa todo el módulo (import * as) para no depender del nombre exacto
// de cada export. Si algo no aparece, ajustar SOLO este archivo.

import * as moduloServicios from '../data/servicios';
import * as moduloNutricionistas from '../data/nutricionistas';
import * as moduloCitas from './citaService';

// Primer arreglo exportado por un módulo (default o con nombre).
function primerArreglo(modulo) {
  if (Array.isArray(modulo?.default)) return modulo.default;
  const arreglo = Object.values(modulo ?? {}).find(Array.isArray);
  return arreglo ?? [];
}

// Servicios del catálogo de Davis.
export function obtenerServicios() {
  return primerArreglo(moduloServicios);
}

// Nutricionistas de Vicente.
export function obtenerNutricionistas() {
  return primerArreglo(moduloNutricionistas);
}

// Las citas pueden venir de una función del citaService o de localStorage.
const NOMBRES_LISTAR = /^(listar|obtener|get)(Citas|Solicitudes|Todas|Todos|All)?$|^(listarCitas|obtenerCitas|obtenerSolicitudes|listarSolicitudes)$/i;

// Busca en citaService una función como obtenerCitas() que devuelva la lista.
export function obtenerCitas() {
  for (const [nombre, fn] of Object.entries(moduloCitas)) {
    if (typeof fn === 'function' && NOMBRES_LISTAR.test(nombre) && fn.length === 0) {
      try {
        const resultado = fn();
        if (Array.isArray(resultado)) return resultado;
      } catch {
        // seguir buscando
      }
    }
  }
  // Respaldo: cualquier clave de localStorage que tenga "cita" o "solicitud".
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      if (/cita|solicitud/i.test(clave)) {
        const datos = JSON.parse(localStorage.getItem(clave));
        if (Array.isArray(datos)) return datos;
      }
    }
  } catch {
    // sin datos
  }
  return [];
}

// ---- Lectura tolerante de campos (cada uno pudo nombrarlos distinto) ----

// Funciones para leer cada dato aunque esté con otro nombre
// (ej: precio o valor, nombre o titulo). Si no existe, se muestra un texto por defecto.
export const campo = {
  nombreServicio: (s) => s?.nombre ?? s?.titulo ?? 'Servicio',
  descripcionServicio: (s) => s?.descripcion ?? s?.resumen ?? '',
  precioServicio: (s) => Number(s?.precio ?? s?.valor ?? 0),
  categoriaServicio: (s) => s?.categoria?.nombre ?? s?.categoria ?? 'Sin categoría',
  idServicio: (s) => s?.id ?? s?.codigo ?? campo.nombreServicio(s),

  nombreNutricionista: (n) =>
    n?.nombre ? `${n.nombre}${n.apellido ? ` ${n.apellido}` : ''}${n.apellidos ? ` ${n.apellidos}` : ''}` : 'Nutricionista',
  especialidadNutricionista: (n) => n?.especialidad ?? n?.area ?? n?.descripcion ?? '',

  nutricionistaCita: (c) =>
    c?.nutricionista?.nombre
      ? campo.nombreNutricionista(c.nutricionista)
      : c?.nutricionista ?? c?.nutricionistaNombre ?? c?.profesional ?? 'Sin asignar',
  servicioCita: (c) => c?.servicio?.nombre ?? c?.servicio ?? c?.servicioNombre ?? 'Sin servicio',
  estadoCita: (c) => String(c?.estado ?? 'pendiente').toLowerCase(),
  totalCita: (c) => Number(c?.total ?? c?.precio ?? c?.monto ?? c?.servicio?.precio ?? 0),
  fechaCita: (c) => c?.fecha ?? c?.fechaHora ?? c?.creadaEn ?? '',
  numeroCita: (c) => c?.numero ?? c?.id ?? c?.codigo ?? '—',
  clienteCita: (c) =>
    c?.paciente?.nombre ?? c?.persona?.nombre ?? c?.cliente?.nombre ?? c?.nombre ?? c?.correo ?? '—',
};
