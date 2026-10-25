// Pruebas del authService. localStorage se reemplaza por un mock para no usar el real.
import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as auth from './authService';

// Mock de localStorage: un objeto en memoria con funciones espía (vi.fn),
// así cada prueba parte limpia y se puede verificar qué se guardó.
function crearLocalStorageFalso() {
  let datos = {};
  return {
    getItem: vi.fn((clave) => (clave in datos ? datos[clave] : null)),
    setItem: vi.fn((clave, valor) => {
      datos[clave] = String(valor);
    }),
    removeItem: vi.fn((clave) => {
      delete datos[clave];
    }),
    clear: vi.fn(() => {
      datos = {};
    }),
    key: vi.fn((i) => Object.keys(datos)[i] ?? null),
    get length() {
      return Object.keys(datos).length;
    },
  };
}

const nuevaPersona = {
  run: '9.876.543-3',
  nombre: 'Ana',
  apellidos: 'Pérez',
  correo: 'ANA@correo.cl',
  telefono: '',
  password: 'abc123',
};

// Antes de cada prueba se parte con un localStorage vacío.
describe('authService', () => {
  let almacen;

  beforeEach(() => {
    almacen = crearLocalStorageFalso();
    vi.stubGlobal('localStorage', almacen);
  });

  it('carga los usuarios iniciales en localStorage la primera vez', () => {
    const usuarios = auth.obtenerUsuarios();
    expect(usuarios.length).toBeGreaterThan(0);
    expect(almacen.setItem).toHaveBeenCalledWith(auth.CLAVE_USUARIOS, expect.any(String));
  });

  it('nunca devuelve la contraseña hacia los componentes', () => {
    for (const u of auth.obtenerUsuarios()) expect(u).not.toHaveProperty('password');
  });

  it('inicia sesión con credenciales correctas y guarda la sesión sin contraseña', () => {
    const resultado = auth.iniciarSesion('admin@clinica.cl', 'Admin123');
    expect(resultado.ok).toBe(true);
    expect(resultado.usuario.rol).toBe('admin');
    const sesion = JSON.parse(almacen.setItem.mock.calls.find(([c]) => c === auth.CLAVE_SESION)[1]);
    expect(sesion).not.toHaveProperty('password');
    expect(auth.esAdmin()).toBe(true);
  });

  it('rechaza credenciales incorrectas con un mensaje genérico', () => {
    expect(auth.iniciarSesion('admin@clinica.cl', 'malaClave1')).toEqual({ ok: false, error: 'Correo o contraseña incorrectos.' });
    expect(auth.iniciarSesion('nadie@correo.cl', 'Admin123').error).toBe('Correo o contraseña incorrectos.');
  });

  it('registra clientes normalizando el correo, aunque se intente enviar rol admin', () => {
    const resultado = auth.registrarUsuario({ ...nuevaPersona, rol: 'admin' });
    expect(resultado.ok).toBe(true);
    expect(resultado.usuario.correo).toBe('ana@correo.cl');
    expect(resultado.usuario.rol).toBe('cliente');
    expect(auth.iniciarSesion('ana@correo.cl', 'abc123').ok).toBe(true);
  });

  it('no permite correos ni RUN repetidos e indica el campo', () => {
    auth.registrarUsuario(nuevaPersona);
    expect(auth.registrarUsuario({ ...nuevaPersona, run: '15.678.901-1' })).toMatchObject({ ok: false, campo: 'correo' });
    expect(auth.registrarUsuario({ ...nuevaPersona, correo: 'otra@correo.cl' })).toMatchObject({ ok: false, campo: 'run' });
  });

  it('al editar con contraseña vacía mantiene la anterior', () => {
    const { usuario } = auth.registrarUsuario(nuevaPersona);
    auth.actualizarUsuario(usuario.id, { nombre: 'Ana María', password: '' });
    expect(auth.obtenerUsuarioPorId(usuario.id).nombre).toBe('Ana María');
    expect(auth.iniciarSesion('ana@correo.cl', 'abc123').ok).toBe(true);
  });

  it('no deja eliminar al único administrador', () => {
    expect(auth.eliminarUsuario(1)).toEqual({ ok: false, error: 'No puedes eliminar al único administrador.' });
    expect(auth.eliminarUsuario(2).ok).toBe(true);
  });

  it('cerrarSesion borra la sesión', () => {
    auth.iniciarSesion('admin@clinica.cl', 'Admin123');
    auth.cerrarSesion();
    expect(almacen.removeItem).toHaveBeenCalledWith(auth.CLAVE_SESION);
    expect(auth.obtenerSesion()).toBeNull();
  });
});
