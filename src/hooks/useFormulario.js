import { useState } from 'react';

// Maneja valores, errores y campos "tocados" de un formulario.
// - El error de un campo aparece al salir de él (blur) o al enviar.
// - Si el campo ya mostró error, se vuelve a validar mientras se escribe,
//   así el mensaje desaparece apenas se corrige.
export default function useFormulario(valoresIniciales, validar) {
  const [valores, setValores] = useState(valoresIniciales);
  const [errores, setErrores] = useState({});
  const [tocados, setTocados] = useState({});

  // Valida un solo campo y actualiza solo su error, sin tocar los demás.
  function validarCampo(nombre, nuevosValores) {
    const todos = validar(nuevosValores);
    setErrores((prev) => {
      const siguiente = { ...prev };
      if (todos[nombre]) siguiente[nombre] = todos[nombre];
      else delete siguiente[nombre];
      return siguiente;
    });
  }

  // Se llama al escribir. Los checkbox usan checked en vez de value.
  function manejarCambio(evento) {
    const { name, type, value, checked } = evento.target;
    const nuevosValores = { ...valores, [name]: type === 'checkbox' ? checked : value };
    setValores(nuevosValores);
    if (tocados[name]) validarCampo(name, nuevosValores);
  }

  // Se llama al salir del campo: lo marca como tocado y lo valida.
  function manejarBlur(evento) {
    const { name } = evento.target;
    setTocados((prev) => ({ ...prev, [name]: true }));
    validarCampo(name, valores);
  }

  // Valida todo el formulario (al enviar). Devuelve true si no hay errores.
  function validarTodo() {
    const todos = validar(valores);
    setErrores(todos);
    setTocados(Object.fromEntries(Object.keys(valores).map((k) => [k, true])));
    return Object.keys(todos).length === 0;
  }

  // Vuelve el formulario a sus valores iniciales (ej: después de enviar).
  function reiniciar(nuevos = valoresIniciales) {
    setValores(nuevos);
    setErrores({});
    setTocados({});
  }

  return { valores, setValores, errores, setErrores, tocados, manejarCambio, manejarBlur, validarTodo, reiniciar };
}
