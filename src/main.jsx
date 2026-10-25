import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import './tema.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { CitaProvider } from './context/CitaContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <CitaProvider>
        <App />
      </CitaProvider>
    </AuthProvider>
  </StrictMode>,
)
