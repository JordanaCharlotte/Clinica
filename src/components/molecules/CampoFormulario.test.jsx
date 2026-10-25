// Pruebas del CampoFormulario: etiqueta, error, eventos y sugerencia de correo.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import CampoFormulario from './CampoFormulario';

describe('CampoFormulario', () => {
  afterEach(cleanup);

  it('asocia la etiqueta con el input (htmlFor / id)', () => {
    render(<CampoFormulario id="correo" name="correo" label="Correo" value="" onChange={() => {}} />);
    const input = screen.getByLabelText('Correo');
    expect(input.id).toBe('correo');
    expect(input.getAttribute('aria-invalid')).toBe('false');
  });

  it('muestra el error, marca el campo inválido y lo enlaza con aria-describedby', () => {
    render(<CampoFormulario id="correo" name="correo" label="Correo" value="x" onChange={() => {}} error="Correo inválido." />);
    const input = screen.getByLabelText('Correo');
    expect(input.className).toContain('is-invalid');
    expect(input.getAttribute('aria-describedby')).toContain('correo-error');
    expect(document.getElementById('correo-error').textContent).toBe('Correo inválido.');
  });

  it('oculta el texto de ayuda cuando hay error', () => {
    const { rerender } = render(
      <CampoFormulario id="run" name="run" label="RUN" value="" onChange={() => {}} ayuda="Con dígito verificador." />,
    );
    expect(screen.getByText('Con dígito verificador.')).toBeTruthy();
    rerender(<CampoFormulario id="run" name="run" label="RUN" value="" onChange={() => {}} ayuda="Con dígito verificador." error="Obligatorio." />);
    expect(screen.queryByText('Con dígito verificador.')).toBeNull();
  });

  it('llama a onChange y onBlur (mocks) con el evento del campo', () => {
    const alCambiar = vi.fn();
    const alSalir = vi.fn();
    render(<CampoFormulario id="nombre" name="nombre" label="Nombre" value="" onChange={alCambiar} onBlur={alSalir} />);
    const input = screen.getByLabelText('Nombre');
    fireEvent.change(input, { target: { value: 'Ana' } });
    fireEvent.blur(input);
    expect(alCambiar).toHaveBeenCalledTimes(1);
    expect(alCambiar.mock.calls[0][0].target.name).toBe('nombre');
    expect(alSalir).toHaveBeenCalledTimes(1);
  });

  it('muestra la sugerencia y ejecuta onAceptarSugerencia al hacer clic', () => {
    const aceptar = vi.fn();
    render(<CampoFormulario id="c" name="c" label="Correo" value="a@gmial.com" onChange={() => {}}
      sugerencia="a@gmail.com" onAceptarSugerencia={aceptar} />);
    fireEvent.click(screen.getByRole('button', { name: 'a@gmail.com' }));
    expect(aceptar).toHaveBeenCalled();
  });

  it('renderiza un select con sus opciones', () => {
    render(<CampoFormulario id="rol" name="rol" type="select" label="Rol" value="" onChange={() => {}} opciones={['admin', 'cliente']} />);
    const select = screen.getByLabelText('Rol');
    expect(select.tagName).toBe('SELECT');
    expect(select.querySelectorAll('option')).toHaveLength(3); // + "Selecciona una opción"
  });

  it('acepta la forma simple (controlId, tipo, valor) y entrega el texto a onChange', () => {
    const alCambiar = vi.fn();
    render(<CampoFormulario controlId="correo" etiqueta="Correo" tipo="email" valor="" onChange={alCambiar} />);
    const input = screen.getByLabelText('Correo');
    expect(input.type).toBe('email');
    fireEvent.change(input, { target: { value: 'ana@correo.cl' } });
    expect(alCambiar).toHaveBeenCalledWith('ana@correo.cl');
  });

  it('renderiza un checkbox marcado según value', () => {
    render(<CampoFormulario id="t" name="t" type="checkbox" label="Acepto" value={true} onChange={() => {}} />);
    expect(screen.getByLabelText('Acepto').checked).toBe(true);
  });
});
