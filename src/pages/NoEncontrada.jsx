import { useNavigate } from 'react-router-dom'
import { PlantillaPublica } from '../components/templates/PlantillaPublica/PlantillaPublica'

// Página: se dibuja con la ruta path="*", que coincide con cualquier dirección
// que no calce con ninguna otra Route (ver App.jsx).
export default function NoEncontrada() {
  const navigate = useNavigate()

  return (
    <PlantillaPublica>
      <h2>Página no encontrada</h2>
      <p>La dirección que escribiste no existe en este sitio.</p>
      <button onClick={() => navigate('/catalogo')}>Ir al catálogo</button>
    </PlantillaPublica>
  )
}