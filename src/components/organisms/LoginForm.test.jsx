// Pruebas del LoginForm: errores en pantalla, login correcto e incorrecto.
// useNavigate se reemplaza por un mock para revisar a dónde redirige.
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';
import { AuthProvider } from '../../context/AuthContext';

// Mock de useNavigate: se reemplaza por una función espía para verificar
// a dónde redirige el formulario sin navegar de verdad.
// vi.hoisted crea el espía antes de que vi.mock (que se eleva al inicio) lo use.
const { navigateFalso } = vi.hoisted(() => ({ navigateFalso: vi.fn() }));
vi.mock('react-router-dom', async (importOriginal) => {
  const original = await importOriginal();
  return { ...original, useNavigate: () => navigateFalso };
});

function renderizar(estadoRuta) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/login', state: estadoRuta }]}>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </MemoryRouter>,
  );
}

// Regex con ^ porque la etiqueta incluye el asterisco de obligatorio ("Contraseña*")
// y así no se confunde con el botón "Mostrar contraseña".
const CORREO = /^Correo electrónico/;
const PASSWORD = /^Contraseña/;

function escribir(etiqueta, valor) {
  fireEvent.change(screen.getByLabelText(etiqueta), { target: { value: valor } });
}

describe('LoginForm', () => {
  beforeEach(() => {
    localStorage.clear();
    navigateFalso.mockClear();
    // El formulario no debe usar alert(): si lo llamara, esta prueba lo detecta.
    // Espía de alert para comprobar que el formulario nunca lo usa.
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it('muestra errores bajo los campos al enviar vacío y no navega', () => {
    renderizar();
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(screen.getByText('El correo es obligatorio.')).toBeTruthy();
    expect(screen.getByText('La contraseña es obligatoria.')).toBeTruthy();
    expect(navigateFalso).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('asocia cada etiqueta con su campo y marca el campo inválido', () => {
    renderizar();
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    const correo = screen.getByLabelText(CORREO);
    expect(correo.getAttribute('aria-invalid')).toBe('true');
    expect(correo.className).toContain('is-invalid');
  });

  it('muestra un mensaje en pantalla si las credenciales son incorrectas', () => {
    renderizar();
    escribir(CORREO, 'admin@clinica.cl');
    escribir(PASSWORD, 'otraClave1');
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(screen.getByRole('alert').textContent).toContain('Correo o contraseña incorrectos.');
    expect(navigateFalso).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('redirige al panel cuando inicia sesión un administrador', () => {
    renderizar();
    escribir(CORREO, 'admin@clinica.cl');
    escribir(PASSWORD, 'Admin123');
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(navigateFalso).toHaveBeenCalledWith('/admin', { replace: true });
  });

  it('vuelve a la página protegida de origen cuando existe', () => {
    renderizar({ desde: '/confirmacion' });
    escribir(CORREO, 'camila@correo.cl');
    escribir(PASSWORD, 'Cliente123');
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));
    expect(navigateFalso).toHaveBeenCalledWith('/confirmacion', { replace: true });
  });

  it('sugiere corregir el dominio del correo y lo aplica con un clic', () => {
    renderizar();
    escribir(CORREO, 'camila@gmial.com');
    fireEvent.click(screen.getByRole('button', { name: 'camila@gmail.com' }));
    expect(screen.getByLabelText(CORREO).value).toBe('camila@gmail.com');
  });
});
