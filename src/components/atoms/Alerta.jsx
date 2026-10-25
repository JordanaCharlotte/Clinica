// Mensaje en pantalla con estilos de Bootstrap. Reemplaza a alert():
// queda dentro del formulario, no bloquea la página y es accesible (role).
export default function Alerta({ tipo = 'info', children, onCerrar }) {
  if (!children) return null;
  const rol = tipo === 'danger' || tipo === 'warning' ? 'alert' : 'status';
  return (
    <div className={`alert alert-${tipo} d-flex align-items-start justify-content-between gap-2`} role={rol}>
      <div>{children}</div>
      {onCerrar && <button type="button" className="btn-close" aria-label="Cerrar mensaje" onClick={onCerrar} />}
    </div>
  );
}
