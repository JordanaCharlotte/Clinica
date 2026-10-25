import { useNavigate } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'
import NavbarSesion from '../molecules/NavbarSesion'
import BarraSuperior from '../molecules/BarraSuperior'
import EncabezadoPagina from '../organisms/EncabezadoPagina'


export function PlantillaPublica(props) {
  const navigate = useNavigate()

  return (
    <>
      <BarraSuperior />
      <Navbar onNavegar={navigate}>
        <NavbarSesion />
      </Navbar>
      <EncabezadoPagina />
      <main className="contenido">
      {props.children}
      </main>
      <Footer onNavegar={navigate} />
    </>
  )
}

export default PlantillaPublica;
