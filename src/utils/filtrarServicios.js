// Quita tildes y pasa a minúsculas, para que "evaluacion" encuentre "Evaluación".
function normalizar(texto) {
  return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function filtrarServicios(servicios, texto, categoria) {
  const buscado = normalizar(texto ?? '').trim()
  const categoriaElegida = normalizar(categoria ?? '').trim()

  return servicios.filter((s) => {
    const coincideCategoria =
      categoriaElegida === '' || normalizar(s.categoria) === categoriaElegida
    const coincideTexto =
      buscado === '' || normalizar(s.nombre + ' ' + s.descripcion).includes(buscado)
    return coincideCategoria && coincideTexto
  })
}