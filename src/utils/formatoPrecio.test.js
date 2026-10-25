import { describe, it, expect } from 'vitest'
import { formatoPrecio } from './formatoPrecio'

describe('formatoPrecio', () => {
  it('da formato de pesos chilenos con punto de miles', () => {
    expect(formatoPrecio(35000)).toBe('$35.000')
  })

  it('formatea números grandes y el cero', () => {
    expect(formatoPrecio(170000)).toBe('$170.000')
    expect(formatoPrecio(0)).toBe('$0')
  })

  it('lanza un error si el valor no es un número', () => {
    expect(() => formatoPrecio('35000')).toThrow(TypeError)
    expect(() => formatoPrecio(NaN)).toThrow('formatoPrecio espera un número')
  })
})