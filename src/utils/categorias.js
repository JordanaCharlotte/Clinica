// obtenerCategorias: arma la lista de categorías sin repetir,
// con cuántos servicios tiene cada una. Ejemplo: [{ nombre: 'Plan', cantidad: 3 }]
export function obtenerCategorias(servicios) {
  const categorias = []
  servicios.forEach((s) => {
    const existente = categorias.find((c) => c.nombre === s.categoria)
    if (existente) {
      existente.cantidad += 1
    } else {
      categorias.push({ nombre: s.categoria, cantidad: 1 })
    }
  })
  return categorias
}