import formatoPrecio from '../../utils/formatoPrecio'

export function Precio(props) {
  // Como props.valor ya viene listo como "$35.000", lo usamos directamente.
  // Si por alguna razón viene vacío, mostramos "$0" como respaldo.
  const precioActualFormateado = typeof props.valor === 'number' ? formatoPrecio(props.valor) : (props.valor || "$0");
  
  // Hacemos lo mismo para el precio anterior si es que existe
  const anterior = typeof props.anterior === 'number' ? formatoPrecio(props.anterior) : (props.anterior ?? null);
  const enOferta = anterior !== null;

  return (
    <p className="precio mb-2">
      <span className="precio__actual">{precioActualFormateado}</span>
      {enOferta && (
        <span className="precio__anterior ms-2" aria-label="Precio anterior">
          <s>{anterior}</s>
        </span>
      )}
    </p>
  )
}
