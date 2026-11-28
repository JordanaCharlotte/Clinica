import { api } from './api';

export async function listarServicios() {
  const respuesta = await api.get('/servicios');
  return respuesta.data;
}

export async function obtenerServicio(id) {
  const respuesta = await api.get(`/servicios/${id}`);
  return respuesta.data;
}

export async function crearServicio(datos) {
  const respuesta = await api.post('/servicios', datos);
  return respuesta.data;
}

export async function actualizarServicio(id, cambios) {
  const respuesta = await api.put(`/servicios/${id}`, cambios);
  return respuesta.data;
}

export async function eliminarServicio(id) {
  await api.delete(`/servicios/${id}`);
}
