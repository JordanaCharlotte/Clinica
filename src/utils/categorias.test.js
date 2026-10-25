import { describe, it, expect } from 'vitest'
import { obtenerCategorias } from './categorias'
import servicios from '../data/servicios'

describe('obtenerCategorias', () => {
  it('lista cada categoría una sola vez con su cantidad de servicios', () => {
    expect(obtenerCategorias(servicios)).toEqual([
      { nombre: 'Consulta', cantidad: 3 },
      { nombre: 'Plan', cantidad: 3 },
      { nombre: 'Evaluación', cantidad: 2 },
      { nombre: 'Taller', cantidad: 2 },
    ])
  })

  it('devuelve una lista vacía si no hay servicios', () => {
    expect(obtenerCategorias([])).toEqual([])
  })
})