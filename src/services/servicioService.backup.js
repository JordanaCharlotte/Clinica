import serviciosIniciales from '../data/servicios'

// Nombre del "cajón" de localStorage donde se guarda la lista de servicios.
const CLAVE = 'servicios'

function leer() {
  const guardado = localStorage.getItem(CLAVE)
  if (guardado === null) {
    localStorage.setItem(CLAVE, JSON.stringify(serviciosIniciales))
    return [...serviciosIniciales]
  }
  return JSON.parse(guardado)
}

function guardar(lista) {
  localStorage.setItem(CLAVE, JSON.stringify(lista))
}

export function listarServicios() {
  return leer()
}

export function obtenerServicio(id) {
  return leer().find((s) => s.id === id) ?? null
}

export function crearServicio(datos) {
  const lista = leer()
  const nuevoId = Math.max(0, ...lista.map((s) => s.id)) + 1
  const nuevo = { ...datos, id: nuevoId }
  guardar([...lista, nuevo])
  return nuevo
}

export function actualizarServicio(id, cambios) {
  const lista = leer().map((s) => (s.id === id ? { ...s, ...cambios } : s))
  guardar(lista)
  return lista.find((s) => s.id === id) ?? null
}

export function eliminarServicio(id) {
  guardar(leer().filter((s) => s.id !== id))
}