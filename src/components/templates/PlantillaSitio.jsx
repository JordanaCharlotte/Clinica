import { Outlet } from 'react-router-dom';
import { PlantillaPublica } from './PlantillaPublica';

// Layout de las rutas públicas de Jordana: usa la misma PlantillaPublica
// del proyecto (Navbar + Footer) y muestra la página de la ruta en <Outlet />.
export default function PlantillaSitio() {
  return (
    <PlantillaPublica>
      <Outlet />
    </PlantillaPublica>
  );
}
