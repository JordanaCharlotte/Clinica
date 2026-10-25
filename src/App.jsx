import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import CatalogoAdmin from './pages/admin/CatalogoAdmin'
import CategoriasAdmin from './pages/admin/CategoriasAdmin'
import ItemsCriticosAdmin from './pages/admin/ItemsCriticosAdmin'
import DetalleServicio from './pages/DetalleServicio'
import ServicioFormularioAdmin from './pages/admin/ServicioFormularioAdmin'
import Ofertas from './pages/Ofertas'



// ---- Vicente ----
import Nutricionistas from './pages/Nutricionistas';
import Confirmacion from './pages/Confirmacion';
import Resultado from './pages/Resultado';
import AgendarCita from './pages/AgendarCita';
import MisCitas from './pages/MisCitas';
import AdminCitas from './pages/admin/AdminCitas';
import ComprobanteAdmin from './pages/admin/ComprobanteAdmin';
import HistorialSolicitudesAdmin from './pages/admin/HistorialSolicitudesAdmin';
import { ServiciosProvider } from './context/ServiciosContext';

// ---- Jordana ----
import PlantillaSitio from './components/templates/PlantillaSitio';
import PlantillaAdmin from './components/templates/PlantillaAdmin';
import RutaProtegida from './components/organisms/RutaProtegida';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import BlogDetalle from './pages/BlogDetalle';
import Contacto from './pages/Contacto';
import NoEncontrada from './pages/NoEncontrada';
import Dashboard from './pages/admin/Dashboard';
import Usuarios from './pages/admin/Usuarios';
import UsuarioFormulario from './pages/admin/UsuarioFormulario';
import UsuarioDetalle from './pages/admin/UsuarioDetalle';
import Reportes from './pages/admin/Reportes';
import Perfil from './pages/admin/Perfil';

function App() {
  return (
    <ServiciosProvider>
    <BrowserRouter>
      <Routes>
        {/* Páginas de Jordana: PlantillaSitio les pone Navbar y Footer */}
        <Route element={<PlantillaSitio />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetalle />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<NoEncontrada />} />
          
        </Route>

        {/* Davis y Vicente: sus páginas ya traen PlantillaPublica adentro */}
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/categoria/:nombre" element={<Catalogo />} />
        <Route path="/servicio/:id" element={<DetalleServicio />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/nutricionistas" element={<Nutricionistas />} />


        {/* Cita: solo con sesión iniciada (cliente o admin) */}
        <Route element={<RutaProtegida />}>
          <Route path="/confirmacion" element={<Confirmacion />} />
          <Route path="/resultado/:id" element={<Resultado />} />
          <Route path="/agendar" element={<AgendarCita />} />
          <Route path="/mis-citas" element={<MisCitas />} />
          
        </Route>

        {/* Panel admin: solo con sesión y rol admin */}
        <Route element={<RutaProtegida rol="admin" />}>
          <Route path="/admin" element={<PlantillaAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="usuarios/nuevo" element={<UsuarioFormulario />} />
            <Route path="usuarios/:id" element={<UsuarioDetalle />} />
            <Route path="usuarios/:id/editar" element={<UsuarioFormulario />} />
            <Route path="reportes" element={<Reportes />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="citas" element={<AdminCitas />} />
            <Route path="comprobante/:id" element={<ComprobanteAdmin />} />
            <Route path="historial" element={<HistorialSolicitudesAdmin />} />
            <Route path="catalogo" element={<CatalogoAdmin />} />
            <Route path="categorias" element={<CategoriasAdmin />} />
            <Route path="criticos" element={<ItemsCriticosAdmin />} />
            <Route path="catalogo/nuevo" element={<ServicioFormularioAdmin />}/>
            <Route path="catalogo/:id/editar" element={<ServicioFormularioAdmin />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </ServiciosProvider>
  );
}

export default App;
