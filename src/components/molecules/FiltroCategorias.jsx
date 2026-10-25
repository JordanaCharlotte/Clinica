import Boton from '../atoms/Boton';


function FiltroCategorias(props) {
    const activa = (props.activa ?? '').toLowerCase();

    return (
        <div className="d-flex flex-wrap gap-2 mb-4">
            <Boton
                texto="Todas"
                variante={activa === '' ? 'success' : 'outline-success'}
                onClick={() => props.onElegir('')}
            />
            {props.categorias.map((c) => (
                <Boton
                    key={c.nombre}
                    texto={`${c.nombre} (${c.cantidad})`}
                    variante={activa === c.nombre.toLowerCase() ? 'success' : 'outline-success'}
                    onClick={() => props.onElegir(c.nombre)}
                />
            ))}
        </div>
    );
}

export default FiltroCategorias;