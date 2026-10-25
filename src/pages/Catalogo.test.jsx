import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { ServiciosProvider } from '../context/ServiciosContext'
import Catalogo from './Catalogo'


const navegarMock = vi.hoisted(() => vi.fn())
vi.mock('react-router-dom', async (importOriginal) => {
  const real = await importOriginal()
  return { ...real, useNavigate: () => navegarMock }
})

function dibujarCatalogo() {
  return render(
    <ServiciosProvider>
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    </ServiciosProvider>,
  )
}

describe('Catalogo', () => {
  beforeEach(() => {
    navegarMock.mockClear()
  })

  it('muestra una tarjeta por cada servicio', () => {
    dibujarCatalogo()
    expect(screen.getAllByRole('button', { name: 'Agendar' })).toHaveLength(10)
  })

  it('el buscador deja solo los servicios que coinciden', async () => {
    dibujarCatalogo()
    await userEvent.type(screen.getByLabelText('Buscar servicio'), 'teleconsulta')
    expect(screen.getByText('Teleconsulta nutricional')).toBeInTheDocument()
    expect(screen.queryByText('Taller de cocina nutritiva')).not.toBeInTheDocument()
  })

  it('muestra un aviso si la búsqueda no encuentra nada', async () => {
    dibujarCatalogo()
    await userEvent.type(screen.getByLabelText('Buscar servicio'), 'zzzz')
    expect(screen.getByText('No encontramos servicios con esa búsqueda.')).toBeInTheDocument()
  })

  it('"Ver detalle" navega a la ficha del servicio', async () => {
    dibujarCatalogo()
    await userEvent.click(screen.getAllByRole('button', { name: 'Ver detalle' })[0])
    expect(navegarMock).toHaveBeenCalledWith('/servicio/1')
  })

  it('elegir una categoría navega a /categoria/:nombre', async () => {
    dibujarCatalogo()
    await userEvent.click(screen.getByRole('button', { name: 'Taller (2)' }))
    expect(navegarMock).toHaveBeenCalledWith('/categoria/Taller')
  })
})