import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import { CssBaseline } from '@mui/material'
import { GestionRegistro } from './pages/GestionRegistros.jsx'
import GestionIntegrantes from './pages/GestionIntegrantes'
import PerfilIntegrante from './pages/PerfilIntegrante'
function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '0 24px',
        height: '56px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
      }}>
        <span style={{ marginRight: 'auto', fontWeight: 500 }}>Mi App</span>

        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            padding: '6px 14px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            backgroundColor: isActive ? '#e8f0fe' : 'transparent',
            color: isActive ? '#1a73e8' : '#555',
            fontWeight: isActive ? 500 : 400,
          })}
        >
          Gestión de registros
        </NavLink>

        <NavLink
          to="/integrantes"
          style={({ isActive }) => ({
            padding: '6px 14px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            backgroundColor: isActive ? '#e8f0fe' : 'transparent',
            color: isActive ? '#1a73e8' : '#555',
            fontWeight: isActive ? 500 : 400,
          })}
        >
          Integrantes
        </NavLink>
      </nav>

      <main style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingTop: '20px' }}>
        <Routes>
          <Route path="/registros" element={<GestionRegistro />} />
          <Route path="/integrantes" element={<GestionIntegrantes />} />
          <Route path="/integrantes/perfil" element={<PerfilIntegrante />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
