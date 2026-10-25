import { Container } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import BuscadorServicios from '../components/molecules/BuscadorServicios'
import FiltroCategorias from '../components/molecules/FiltroCategorias'
import ListaServicios from '../components/organisms/ListaServicios'
import { PlantillaPublica } from '../components/templates/PlantillaPublica'
import { useServicios } from '../context/ServiciosContext'
import { obtenerCategorias } from '../utils/categorias'
import { filtrarServicios } from '../utils/filtrarServicios'

function Catalogo() {
  const navigate = useNavigate()
  const { nombre = '' } = useParams()
  const { servicios } = useServicios()
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState(nombre)

  const categorias = obtenerCategorias(servicios)
  const serviciosFiltrados = filtrarServicios(
    servicios,
    busqueda,
    categoria
  )

  return (
    <PlantillaPublica>
      <Container className="mt-5">
        <h2 className="text-center mb-4">
          Catálogo de Servicios
        </h2>

        <BuscadorServicios
          valor={busqueda}
          onCambiar={setBusqueda}
        />

        <FiltroCategorias
          categorias={categorias}
          activa={categoria}
          onElegir={(seleccionada) => {
            setCategoria(seleccionada)

            if (seleccionada) {
              navigate(`/categoria/${seleccionada}`)
            }
          }}
        />

        <ListaServicios
          servicios={serviciosFiltrados}
          mensajeVacio="No encontramos servicios con esa búsqueda."
          onVerDetalle={(id) => navigate(`/servicio/${id}`)}
          onAgendar={() => navigate('/agendar')}
        />
      </Container>
    </PlantillaPublica>
  )
}

export default Catalogo
