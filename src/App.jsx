import Inicio from './pages/Inicio';
import servicios from './data/servicios';
import Catalogo from './pages/Catalogo'; 

function App() {
  return <Inicio servicios={servicios} />;
}

export default App;