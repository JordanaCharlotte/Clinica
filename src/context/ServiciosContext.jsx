import { createContext, useContext, useEffect, useState } from 'react';
import * as servicioService from '../services/servicioService';

const ServiciosContext = createContext(null);

export function ServiciosProvider({ children }) {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  async function cargarServicios() {
    try {
      setCargando(true);
      setError('');

      const datos = await servicioService.listarServicios();
      setServicios(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error('Error al cargar servicios:', error);
      setError('No se pudieron cargar los servicios.');
      setServicios([]);
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarServicios();
  }, []);

  async function crear(datos) {
    try {
      setError('');
      await servicioService.crearServicio(datos);
      await cargarServicios();
    } catch (error) {
      console.error('Error al crear servicio:', error);
      setError('No se pudo crear el servicio.');
      throw error;
    }
  }

  async function actualizar(id, cambios) {
    try {
      setError('');
      await servicioService.actualizarServicio(id, cambios);
      await cargarServicios();
    } catch (error) {
      console.error('Error al actualizar servicio:', error);
      setError('No se pudo actualizar el servicio.');
      throw error;
    }
  }

  async function eliminar(id) {
    try {
      setError('');
      await servicioService.eliminarServicio(id);
      await cargarServicios();
    } catch (error) {
      console.error('Error al eliminar servicio:', error);
      setError('No se pudo eliminar el servicio.');
      throw error;
    }
  }

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        cargando,
        error,
        crear,
        actualizar,
        eliminar,
        recargar: cargarServicios,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}

export function useServicios() {
  const contexto = useContext(ServiciosContext);

  if (!contexto) {
    throw new Error(
      'useServicios debe usarse dentro de un ServiciosProvider',
    );
  }

  return contexto;
}
