import { describe, it, expect } from 'vitest'
import { esOferta, obtenerOfertas } from './ofertas'
import servicios from '../data/servicios'

describe('ofertas', () => {
  it('esOferta es verdadero solo si el precio anterior es mayor al actual', () => {
    expect(esOferta({ precio: 65000, precioAnterior: 75000 })).toBe(true)
    expect(esOferta({ precio: 35000, precioAnterior: null })).toBe(false)
    expect(esOferta({ precio: 35000, precioAnterior: 35000 })).toBe(false)
  })

  it('obtenerOfertas deja solo los servicios en oferta', () => {
    const ofertas = obtenerOfertas(servicios)
    expect(ofertas.map((s) => s.codigo)).toEqual(['PL001', 'TG002'])
  })
})