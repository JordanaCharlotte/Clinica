import { describe, it, expect } from 'vitest'
import { validarTeleconsulta } from './reglasCita'

describe('validarTeleconsulta', () => {
    it('permite una consulta presencial', () => {
        expect(validarTeleconsulta(1, [])).toBe('')
    })

    it('rechaza teleconsulta sin consulta presencial previa', () => {
        expect(validarTeleconsulta('CN004', [])).toBe(
            'La teleconsulta requiere haber tenido antes una consulta presencial.'
        )
    })

    it('permite teleconsulta después de una consulta presencial', () => {
        const citas = [
            {
                servicioId: 1,
                estado: 'confirmada'
            }
        ]

        expect(validarTeleconsulta(3, citas)).toBe('')
    })
})
