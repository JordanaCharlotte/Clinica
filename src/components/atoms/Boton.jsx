function Boton(props) {
    const variante = props.variante ?? "primary";
    const type = props.type ?? 'button';
    const disabled = props.disabled ?? false
    return (
        <button className={`btn btn-${variante}`} onClick={props.onClick}>
            {props.texto}
        </button>
    );
}

export default Boton;