import { useNavigate } from 'react-router-dom'
import Navbar from '../organisms/Navbar'
import Footer from '../organisms/Footer'


export function PlantillaPublica(props) {
  const navigate = useNavigate()

  return (
    <>
      <Navbar onNavegar={navigate}/>
      <main className="contenido">
      {props.children}
      </main>
      <Footer onNavegar={navigate} />
    </>
  )
}

export default PlantillaPublica;