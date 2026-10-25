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


export function obtenerCitas() {
  return leer()
}


export function obtenerCita(id) {
  return leer().find((c) => c.id === id) ?? null
}


export function guardarCita(cita) {
  const lista = leer()

  const nuevoId = Math.max(0, ...lista.map((c) => c.id)) + 1

  const nueva = { ...cita, id: nuevoId, estado: 'pendiente' }
  guardar([...lista, nueva])
  return nueva
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