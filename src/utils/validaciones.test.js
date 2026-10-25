// Pruebas de las funciones de validación (RUN, correo, contraseña y formularios).
import { describe, expect, it } from 'vitest';
import * as v from './validaciones';

describe('validaciones', () => {
  describe('RUN', () => {
    it('acepta RUN válidos con o sin puntos y guion', () => {
      expect(v.validarRun('12.345.678-5')).toBeNull();
      expect(v.validarRun('123456785')).toBeNull();
      expect(v.validarRun('11.111.111-1')).toBeNull();
    });

    it('rechaza un dígito verificador incorrecto con un mensaje específico', () => {
      expect(v.validarRun('12.345.678-9')).toBe('El dígito verificador del RUN no es válido.');
    });

    it('rechaza RUN vacío o con formato inválido', () => {
      expect(v.validarRun('')).toBe('El RUN es obligatorio.');
      expect(v.validarRun('abc')).toMatch(/dígito verificador/);
    });

    it('formatea el RUN con puntos y guion', () => {
      expect(v.formatearRun('123456785')).toBe('12.345.678-5');
    });
  });

  describe('correo', () => {
    it('valida el formato', () => {
      expect(v.validarCorreo('ana@correo.cl')).toBeNull();
      expect(v.validarCorreo('ana@correo')).toMatch(/correo válido/);
      expect(v.validarCorreo('')).toBe('El correo es obligatorio.');
    });

    it('sugiere el dominio correcto cuando hay un error de tipeo', () => {
      expect(v.sugerirCorreo('ana@gmial.com')).toBe('ana@gmail.com');
      expect(v.sugerirCorreo('ana@gmail.com')).toBeNull();
    });
  });

  describe('contraseña', () => {
    it('exige largo y combinación de letras y números', () => {
      expect(v.validarPassword('abc1')).toMatch(/al menos 6/);
      expect(v.validarPassword('abcdefg')).toMatch(/letras y números/);
      expect(v.validarPassword('abc123')).toBeNull();
    });

    it('detecta cuando la confirmación no coincide', () => {
      expect(v.validarConfirmacion('abc123', 'abc124')).toBe('Las contraseñas no coinciden.');
    });
  });

  describe('formularios completos', () => {
    it('validarRegistro devuelve un error por cada campo inválido', () => {
      const errores = v.validarRegistro({});
      expect(Object.keys(errores)).toEqual(
        expect.arrayContaining(['run', 'nombre', 'apellidos', 'correo', 'password', 'confirmarPassword', 'aceptaTerminos']),
      );
      // El teléfono es opcional: vacío no es error.
      expect(errores.telefono).toBeUndefined();
    });

    it('validarRegistro no devuelve errores con datos correctos', () => {
      const errores = v.validarRegistro({
        run: '12.345.678-5',
        nombre: 'Ana',
        apellidos: 'Pérez',
        correo: 'ana@correo.cl',
        telefono: '+56 9 1234 5678',
        password: 'abc123',
        confirmarPassword: 'abc123',
        aceptaTerminos: true,
      });
      expect(v.hayErrores(errores)).toBe(false);
    });

    it('validarUsuario permite contraseña vacía solo al editar', () => {
      const datos = { run: '12.345.678-5', nombre: 'Ana', apellidos: 'Pérez', correo: 'ana@correo.cl', rol: 'cliente', password: '' };
      expect(v.validarUsuario(datos).password).toBeDefined();
      expect(v.validarUsuario(datos, { esEdicion: true }).password).toBeUndefined();
    });

    it('validarContacto exige asunto de la lista y mensaje de al menos 10 caracteres', () => {
      const errores = v.validarContacto({ nombre: 'Ana', correo: 'ana@correo.cl', asunto: 'Otro', mensaje: 'corto' });
      expect(errores.asunto).toBe('Elige un asunto.');
      expect(errores.mensaje).toMatch(/al menos 10/);
    });
  });
});
