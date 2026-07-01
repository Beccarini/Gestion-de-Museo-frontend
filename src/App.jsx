import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { CssBaseline, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';

// Contexto
import { AuthProvider, useAuth } from './context/AuthContext';

// Páginas
import Login from './pages/Login';
import { GestionRegistro } from './pages/GestionRegistros.jsx';
import GestionIntegrantes from './pages/GestionIntegrantes';
import PerfilIntegrante from './pages/PerfilIntegrante';
import GestionPermisos from './pages/GestionPermisos.jsx';
import { GestionEventos } from './pages/GestionEvento.jsx';
import { PerfilEvento } from './pages/PerfilEvento.jsx';
import { GestionPlantilla } from './pages/GestionPlantilla.jsx';

const drawerWidth = 240;

const menuItems = [
  { text: 'DashBoard', path: '/' },
  { text: 'Integrantes', path: '/integrantes' },
  { text: 'Registros', path: '/registros' },
  { text: 'Permisos', path: '/permisos' },
  { text: 'Eventos', path: '/eventos' },
  { text: 'Proyectos', path: '/proyectos' },
  { text: 'Plantilla de evento', path:'/plantilla'}
];


const RutaPublica = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  // Si ya está logueado, lo redirigimos a la página principal
  if (isAuthenticated) return <Navigate to="/" replace />;
  
  return children;
};

const RutaProtegida = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null;
  // Si NO está logueado, lo redirigimos al login
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};
const LayoutPrivado = () => {
  const { logout } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* BARRA LATERAL */}
      <Box sx={{ width: drawerWidth, borderRight: '1px solid #e0e0e0', backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ p: 3, fontWeight: 'bold', fontSize: '1.2rem', color: '#1a73e8' }}>
          Sistema MUIC
        </Typography>
        
        {/* Menú de Navegación */}
        <List sx={{ flexGrow: 1 }}>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton 
                component={NavLink} 
                to={item.path}
                sx={{
                  '&.active': { backgroundColor: '#e8f0fe', color: '#1a73e8', fontWeight: 500 },
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List>
          <ListItem disablePadding>
            <ListItemButton 
                onClick={logout} 
                sx={{ '&:hover': { backgroundColor: '#ffebee' } }}
            >
              <ListItemText primary="Cerrar Sesión" sx={{ color: '#d32f2f', fontWeight: '500' }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>

      {/* CONTENIDO PRINCIPAL */}
      <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#fafafa', p: 3 }}>
        <Routes>
          <Route path="/registros" element={<GestionRegistro />} />
          <Route path="/integrantes" element={<GestionIntegrantes />} />
          <Route path="/integrantes/:id" element={<PerfilIntegrante />} />
          <Route path="/permisos" element={<GestionPermisos />} />
          <Route path="/eventos" element={<GestionEventos />} />
          <Route path="/eventos/:id" element={<PerfilEvento />} />
          <Route path="/plantilla" element={<GestionPlantilla />} />
          <Route path="*" element={<Navigate to="/integrantes" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

// --- Componente Raíz ---

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          <Route 
            path="/login" 
            element={
              <RutaPublica>
                <Login />
              </RutaPublica>
            } 
          />
          <Route 
            path="/*" 
            element={
              <RutaProtegida>
                <LayoutPrivado />
              </RutaProtegida>
            } 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;