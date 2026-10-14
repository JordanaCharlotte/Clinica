import { useNavigate } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'


function PlantillaPublica(props) {
  const navigate = useNavigate()

  return (
    <>
      <Navbar
        onNavegar={navigate}
      />
      <main className="contenido">
        {/* props.children es el contenido que cada página pone dentro de <PlantillaPublica> */}
        {props.children}
      </main>
      <Footer onNavegar={navigate} />
    </>
  )
}

export default PlantillaPublica;