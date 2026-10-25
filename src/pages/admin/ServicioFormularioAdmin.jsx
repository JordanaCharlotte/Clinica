import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
    crearServicio,
    listarServicios,
    actualizarServicio,
} from '../../services/servicioService'

function ServicioFormularioAdmin() {
    const navigate = useNavigate()
    const { id } = useParams()
    const editando = Boolean(id)

    const servicioExistente = editando
        ? listarServicios().find(
              (servicio) => String(servicio.id) === String(id)
          )
        : null

    const [nombre, setNombre] = useState(
        servicioExistente?.nombre ?? ''
    )
    const [descripcion, setDescripcion] = useState(
        servicioExistente?.descripcion ?? ''
    )
    const [categoria, setCategoria] = useState(
        servicioExistente?.categoria ?? ''
    )
    const [precio, setPrecio] = useState(
        servicioExistente?.precio ?? ''
    )
    const [disponibilidad, setDisponibilidad] = useState(
        servicioExistente?.disponibilidad ?? true
    )
    const [error, setError] = useState('')

    function guardar(evento) {
        evento.preventDefault()

        if (!nombre.trim()) {
            setError('El nombre es obligatorio.')
            return
        }

        if (!categoria.trim()) {
            setError('La categoría es obligatoria.')
            return
        }

        if (!precio || Number(precio) < 0) {
            setError('Ingresa un precio válido.')
            return
        }

        const datos = {
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            categoria: categoria.trim(),
            precio: Number(precio),
            disponibilidad,
        }

        if (editando) {
            actualizarServicio(Number(id), datos)
        } else {
            crearServicio(datos)
        }

        navigate('/admin/catalogo')
    }

    if (editando && !servicioExistente) {
        return (
            <>
                <h1 className="h3 mb-4">Servicio no encontrado</h1>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigate('/admin/catalogo')}
                >
                    Volver al catálogo
                </button>
            </>
        )
    }

    return (
        <>
            <h1 className="h3 mb-4">
                {editando ? 'Editar servicio' : 'Nuevo servicio'}
            </h1>

            <form onSubmit={guardar} className="card">
                <div className="card-body">
                    {error && (
                        <div className="alert alert-danger">
                            {error}
                        </div>
                    )}

                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(evento) =>
                                setNombre(evento.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="descripcion"
                            className="form-label"
                        >
                            Descripción
                        </label>

                        <textarea
                            id="descripcion"
                            name="descripcion"
                            className="form-control"
                            rows="4"
                            value={descripcion}
                            onChange={(evento) =>
                                setDescripcion(evento.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="categoria"
                            className="form-label"
                        >
                            Categoría
                        </label>

                        <input
                            id="categoria"
                            name="categoria"
                            type="text"
                            className="form-control"
                            value={categoria}
                            onChange={(evento) =>
                                setCategoria(evento.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">
                            Precio
                        </label>

                        <input
                            id="precio"
                            name="precio"
                            type="number"
                            min="0"
                            className="form-control"
                            value={precio}
                            onChange={(evento) =>
                                setPrecio(evento.target.value)
                            }
                        />
                    </div>

                    <div className="form-check mb-4">
                        <input
                            id="disponibilidad"
                            name="disponibilidad"
                            type="checkbox"
                            className="form-check-input"
                            checked={disponibilidad}
                            onChange={(evento) =>
                                setDisponibilidad(
                                    evento.target.checked
                                )
                            }
                        />

                        <label
                            htmlFor="disponibilidad"
                            className="form-check-label"
                        >
                            Servicio disponible
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary me-2"
                    >
                        Guardar
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/admin/catalogo')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </>
    )
}

export default ServicioFormularioAdmin
