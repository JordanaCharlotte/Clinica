import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Después de cada prueba: desmonta los componentes y limpia localStorage,
// así ninguna prueba depende de lo que dejó la anterior.
afterEach(() => {
  cleanup();
  localStorage.clear();
});
