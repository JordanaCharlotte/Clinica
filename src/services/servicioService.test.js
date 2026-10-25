import { describe, it, expect, vi } from 'vitest'
import {
  listarServicios,
  obtenerServicio,
  crearServicio,
  actualizarServicio,
  eliminarServicio,
} from './servicioService'
import serviciosIniciales from '../data/servicios'

// setupTests.js vacía localStorage después de cada prueba, así que cada
// prueba parte desde cero.
describe('servicioService', () => {
  it('la primera vez devuelve los servicios de partida y los guarda', () => {
    const lista = listarServicios()
    expect(lista).toHaveLength(serviciosIniciales.length)
    expect(localStorage.getItem('servicios')).not.toBeNull()
  })

  it('obtiene un servicio por id, o null si no existe', () => {
    expect(obtenerServicio(1).codigo).toBe('CN001')
    expect(obtenerServicio(999)).toBeNull()
  })

  it('crea un servicio nuevo con un id que no se repite', () => {
    // Mock: espiamos setItem para comprobar que realmente se guarda.
    const espia = vi.spyOn(Storage.prototype, 'setItem')
    const nuevo = crearServicio({ nombre: 'Consulta de prueba', precio: 10000 })
    expect(nuevo.id).toBe(serviciosIniciales.length + 1)
    expect(listarServicios()).toHaveLength(serviciosIniciales.length + 1)
    expect(espia).toHaveBeenCalled()
    espia.mockRestore()
  })

  it('actualiza solo los campos indicados', () => {
    const actualizado = actualizarServicio(1, { precio: 40000 })
    expect(actualizado.precio).toBe(40000)
    expect(actualizado.nombre).toBe('Primera consulta nutricional')
  })

  it('elimina el servicio con ese id', () => {
    eliminarServicio(1)
    expect(obtenerServicio(1)).toBeNull()
    expect(listarServicios()).toHaveLength(serviciosIniciales.length - 1)
  })
})