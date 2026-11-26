import { api } from './api';

export async function listarNutricionistas() {
  const respuesta = await api.get('/nutricionistas');
  return respuesta.data;
}

export async function obtenerNutricionista(id) {
  const respuesta = await api.get(`/nutricionistas/${id}`);
  return respuesta.data;
}

export async function crearNutricionista(datos) {
  const respuesta = await api.post('/nutricionistas', datos);
  return respuesta.data;
}

export async function actualizarNutricionista(id, cambios) {
  const respuesta = await api.put(`/nutricionistas/${id}`, cambios);
  return respuesta.data;
}

export async function eliminarNutricionista(id) {
  await api.delete(`/nutricionistas/${id}`);
}
