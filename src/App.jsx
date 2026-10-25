import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio'
import Catalogo from './pages/Catalogo'
import Nutricionistas from './pages/Nutricionistas'
import AgendarCita from './pages/AgendarCita'
import Confirmacion from './pages/Confirmacion'
import Resultado from './pages/Resultado'
import { CitaProvider } from './context/CitaContext'
import { ServiciosProvider } from './context/ServiciosContext'
import AdminCitas from './pages/admin/AdminCitas'
import ComprobanteAdmin from './pages/admin/ComprobanteAdmin'
import HistorialSolicitudesAdmin from './pages/admin/HistorialSolicitudesAdmin'
import MisCitas from './pages/MisCitas'


function App() {
  return (
    <ServiciosProvider>
      <CitaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/"element={<Inicio />} />
            <Route path="/catalogo" element={<Catalogo />}/>
            <Route path="/nutricionistas" element={<Nutricionistas />}/>
            <Route path="/agendar" element={<AgendarCita />}/>
            <Route path="/confirmacion" element={<Confirmacion />}/>
            <Route path="/resultado/:id" element={<Resultado />}/>
            <Route path="/admin/citas" element={<AdminCitas />}/>
            <Route path="/admin/comprobante/:id" element={<ComprobanteAdmin />}/>
            <Route path="/admin/historial" element={<HistorialSolicitudesAdmin />}/>
            <Route path="/mis-citas" element={<MisCitas />}/>
            </Routes>
        </BrowserRouter>
      </CitaProvider>
    </ServiciosProvider>
  )
}

export default App
