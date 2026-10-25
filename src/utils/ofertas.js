// esOferta: un servicio está en oferta si tiene un precio anterior mayor al actual.
export function esOferta(servicio) {
  return (servicio.precioAnterior ?? 0) > servicio.precio
}

// obtenerOfertas: deja solo los servicios que están en oferta.
export function obtenerOfertas(servicios) {
  return servicios.filter(esOferta)
}