import { describe, it, expect } from 'vitest'
import { filtrarServicios } from './filtrarServicios'
import servicios from '../data/servicios'

describe('filtrarServicios', () => {
  it('sin filtros devuelve todos los servicios', () => {
    expect(filtrarServicios(servicios, '', '')).toHaveLength(servicios.length)
  })

  it('busca por texto en el nombre, sin importar mayúsculas', () => {
    const resultado = filtrarServicios(servicios, 'TELECONSULTA', '')
    expect(resultado).toHaveLength(1)
    expect(resultado[0].codigo).toBe('CN004')
  })

  it('filtra por categoría sin importar tildes ni mayúsculas', () => {
    const resultado = filtrarServicios(servicios, '', 'evaluacion')
    expect(resultado).toHaveLength(2)
    expect(resultado.every((s) => s.categoria === 'Evaluación')).toBe(true)
  })

  it('combina el texto y la categoría, y devuelve vacío si nada coincide', () => {
    expect(filtrarServicios(servicios, 'plan', 'Plan')).toHaveLength(3)
    expect(filtrarServicios(servicios, 'teleconsulta', 'Taller')).toEqual([])
  })
})