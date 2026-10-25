// Campo de formulario reutilizable: etiqueta asociada (htmlFor/id), control,
// texto de ayuda, sugerencia y mensaje de error bajo el campo.
// Sirve para input, textarea, select y checkbox.
//
// Props principales:
//   id, name, label (o etiqueta), type, value, onChange, onBlur,
//   error (o mensajeError), ayuda, sugerencia, onAceptarSugerencia,
//   autoComplete, placeholder, required, opciones (para select), maxLength
//
// También acepta la forma "simple" que usa Vicente en Confirmacion:
//   controlId, etiqueta, tipo, valor, onChange(valor), error
// En esa forma onChange recibe directamente el texto, no el evento.
export default function CampoFormulario({
  id,
  controlId,
  name,
  label,
  etiqueta,
  type,
  tipo,
  value,
  valor,
  onChange,
  onBlur,
  error,
  mensajeError,
  ayuda,
  sugerencia,
  onAceptarSugerencia,
  opciones = [],
  required = false,
  className = '',
  children,
  ...resto
}) {
  // Forma simple (valor/controlId): onChange recibe el valor en vez del evento.
  const modoSimple = valor !== undefined || controlId !== undefined;
  type = type ?? tipo ?? 'text';
  value = value ?? valor;
  const manejarCambio =
    modoSimple && onChange
      ? (e) => onChange(type === 'checkbox' ? e.target.checked : e.target.value)
      : onChange;

  const idCampo = id ?? controlId ?? name;
  const texto = label ?? etiqueta;
  const mensaje = error ?? mensajeError;
  const idAyuda = ayuda ? `${idCampo}-ayuda` : undefined;
  const idError = mensaje ? `${idCampo}-error` : undefined;
  const describedBy = [idAyuda, idError].filter(Boolean).join(' ') || undefined;
  const claseValidez = mensaje ? ' is-invalid' : '';

  const propsComunes = {
    id: idCampo,
    name,
    onChange: manejarCambio,
    onBlur,
    required,
    'aria-invalid': mensaje ? 'true' : 'false',
    'aria-describedby': describedBy,
    ...resto,
  };

  if (type === 'checkbox') {
    return (
      <div className={`form-check mb-3 ${className}`}>
        <input type="checkbox" className={`form-check-input${claseValidez}`} checked={Boolean(value)} {...propsComunes} />
        <label className="form-check-label" htmlFor={idCampo}>
          {texto ?? children}
        </label>
        {mensaje && (
          <div id={idError} className="invalid-feedback d-block">
            {mensaje}
          </div>
        )}
      </div>
    );
  }

  let control;
  if (type === 'textarea') {
    control = <textarea className={`form-control${claseValidez}`} rows={5} value={value ?? ''} {...propsComunes} />;
  } else if (type === 'select') {
    control = (
      <select className={`form-select${claseValidez}`} value={value ?? ''} {...propsComunes}>
        <option value="">Selecciona una opción</option>
        {opciones.map((op) => {
          const valor = typeof op === 'object' ? op.valor : op;
          const textoOp = typeof op === 'object' ? op.texto : op;
          return (
            <option key={valor} value={valor}>
              {textoOp}
            </option>
          );
        })}
      </select>
    );
  } else {
    control = <input type={type} className={`form-control${claseValidez}`} value={value ?? ''} {...propsComunes} />;
  }

  return (
    <div className={`mb-3 ${className}`}>
      {texto && (
        <label htmlFor={idCampo} className="form-label">
          {texto}
          {required && (
            <span className="text-danger ms-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}
      {children ? <div className="input-group has-validation">{control}{children}</div> : control}
      {ayuda && !mensaje && (
        <div id={idAyuda} className="form-text">
          {ayuda}
        </div>
      )}
      {mensaje && (
        <div id={idError} className="invalid-feedback d-block">
          {mensaje}
        </div>
      )}
      {sugerencia && (
        <div className="form-text text-primary">
          ¿Quisiste decir{' '}
          {onAceptarSugerencia ? (
            <button type="button" className="btn btn-link btn-sm p-0 align-baseline" onClick={onAceptarSugerencia}>
              {sugerencia}
            </button>
          ) : (
            <strong>{sugerencia}</strong>
          )}
          ?
        </div>
      )}
    </div>
  );
}

export { CampoFormulario };
