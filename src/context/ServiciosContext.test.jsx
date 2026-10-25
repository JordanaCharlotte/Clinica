import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ServiciosProvider, useServicios } from './ServiciosContext'
import serviciosIniciales from '../data/servicios'

function Consumidor() {
  const serviciosCtx = useServicios()
  return (
    <div>
      <p>Total: {serviciosCtx.servicios.length}</p>
      <button onClick={() => serviciosCtx.crear({ nombre: 'Nuevo', precio: 1000 })}>
        Crear
      </button>
    </div>
  )
}

describe('ServiciosContext', () => {
  it('entrega la lista de servicios a los componentes de adentro', () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )
    expect(screen.getByText(`Total: ${serviciosIniciales.length}`)).toBeInTheDocument()
  })

  it('al crear un servicio, la pantalla se actualiza', async () => {
    render(
      <ServiciosProvider>
        <Consumidor />
      </ServiciosProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Crear' }))
    expect(screen.getByText(`Total: ${serviciosIniciales.length + 1}`)).toBeInTheDocument()
  })
})