export function formatoPrecio(precio) {
  // Si no es un numero valido, avisamos con un error en vez de mostrar "NaN".
  if (typeof precio !== 'number' || Number.isNaN(precio)) {
    throw new TypeError('formatoPrecio espera un número')
  }
  // Intl.NumberFormat da el formato de moneda segun el pais ('es-CL' = Chile).
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
  }).format(precio)
}
export default formatoPrecio;
