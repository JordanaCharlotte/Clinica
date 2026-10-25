import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Catalogo from './pages/Catalogo';
import Nutricionistas from './pages/Nutricionistas';
import AgendarCita from './pages/AgendarCita';
import Confirmacion from './pages/Confirmacion';
import Resultado from './pages/Resultado';
import { CitaProvider } from './context/CitaContext';
import servicios from './data/servicios';

function App() {
  return (
    <CitaProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<Catalogo servicios ={servicios} />}/>
          <Route path="/nutricionistas" element={<Nutricionistas />}/>
          <Route path="/agendar" element={<AgendarCita servicios ={servicios} />}/>
          <Route path="/confirmacion" element={<Confirmacion />}/>
          <Route path="/resultado/:id" element={<Resultado />}/>
          

        </Routes>
      </BrowserRouter>
    </CitaProvider>

    );
}

export default App;