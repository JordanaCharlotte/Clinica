import { createContext, useContext, useState } from 'react'
import * as servicioService from '../services/servicioService'


const ServiciosContext = createContext(null)


export function ServiciosProvider(props) {

  const [servicios, setServicios] = useState(() => servicioService.listarServicios())


  function crear(datos) {
    servicioService.crearServicio(datos)
    setServicios(servicioService.listarServicios())
  }

  function actualizar(id, cambios) {
    servicioService.actualizarServicio(id, cambios)
    setServicios(servicioService.listarServicios())
  }

  function eliminar(id) {
    servicioService.eliminarServicio(id)
    setServicios(servicioService.listarServicios())
  }

  return (
    <ServiciosContext.Provider value={{ servicios, crear, actualizar, eliminar }}>
      {props.children}
    </ServiciosContext.Provider>
  )
}

export function useServicios() {
  const contexto = useContext(ServiciosContext)
  if (!contexto) {
    throw new Error('useServicios debe usarse dentro de un ServiciosProvider')
  }
  return contexto
}