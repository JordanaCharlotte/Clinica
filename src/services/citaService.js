import { api } from './api';

const CLAVE = 'citas'
const CLAVE_EN_CURSO = 'citaEnCurso'

function leer() {
  const guardado = localStorage.getItem(CLAVE)


  if (guardado === null) {
    return []
  }


  return JSON.parse(guardado)
}


function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}


export async function obtenerCitas() {
  const respuesta = await api.get('/citas');
  return respuesta.data;
}


export async function obtenerCita(id) {
  const respuesta = await api.get('/citas/' + id);
  return respuesta.data;
}


export async function guardarCita(cita) {
  const datos = {
    servicioId: Number(cita.servicioId),
    nutricionistaId: cita.nutricionistaId,
    fecha: cita.fecha,
    hora: cita.hora,
  };

  const respuesta = await api.post('/citas', datos);
  return respuesta.data;
}


export function citasDeUsuario(correo) {
  return leer().filter((c) => c.correo.toLowerCase() === correo.toLowerCase())
}

export function modificarCita(id, cambios) {
  const lista = leer().map((c) => (c.id === id ? { ...c, ...cambios } : c))
  guardar(lista)
  return lista.find((c) => c.id === id) ?? null
}

export function reprogramarCita(id, fecha, hora) {
    return modificarCita(id, {
        fecha,
        hora,
        estado: 'reprogramada'
    })
}

export function obtenerCitaEnCurso() {
  const guardado = localStorage.getItem(CLAVE_EN_CURSO)
  if (guardado === null) {
    return null
  }
  return JSON.parse(guardado)
}

export function guardarCitaEnCurso(cita) {
  localStorage.setItem(CLAVE_EN_CURSO, JSON.stringify(cita))
}

export function limpiarCitaEnCurso() {
  localStorage.removeItem(CLAVE_EN_CURSO)
}