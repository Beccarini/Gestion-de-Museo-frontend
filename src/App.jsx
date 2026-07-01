import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { CssBaseline, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { GestionRegistro } from './pages/GestionRegistros.jsx';
import GestionIntegrantes from './pages/GestionIntegrantes';
import PerfilIntegrante from './pages/PerfilIntegrante';
import GestionPermisos from './pages/GestionPermisos.jsx';
import { AuthProvider, useAuth } from './context/AuthContext';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login';
const drawerWidth = 240;
import { GestionEventos } from './pages/GestionEvento.jsx';
import { PerfilEvento } from './pages/PerfilEvento.jsx';

const menuItems = [
  { text: 'DashBoard', path: '/' },
  { text: 'Integrantes', path: '/integrantes' },
  { text: 'Registros', path: '/registros' },
  { text: 'Permisos', path: '/permisos' },
  { text: 'Eventos', path: '/eventos' },
  { text: 'Proyectos', path: '/proyectos' },
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
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  return children;
};
const LayoutPrivado = () => {

  const { logout } = useAuth();
return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      
      {/* BARRA LATERAL */}
      <Box sx={{ width: drawerWidth, borderRight: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
        <Typography sx={{ p: 3, fontWeight: 'bold', fontSize: '1.2rem', color: '#1a73e8' }}>
          Sistema MUIC
        </Typography>
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
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          backgroundColor: '#fafafa', 
          p: 0, // Quitamos el padding global para que cada página decida sus márgenes
          width: `calc(100% - ${drawerWidth}px)`, // Forzamos el ancho exacto restando el menú lateral
          height: '100vh',
          overflow: 'auto' // Permite el scroll si el contenido es muy largo
        }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registros" element={<GestionRegistro />} />
          <Route path="/integrantes" element={<GestionIntegrantes />} />
          <Route path="/integrantes/:id" element={<PerfilIntegrante />} />
          <Route path="/permisos" element={<GestionPermisos />} />
          {/* Redirección por defecto si entran a la raíz */}
          <Route path="*" element={<Navigate to="/integrantes" replace />} />
        </Routes>
      </Box>

    </Box>
  );
};

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <CssBaseline />
        <Routes>
          {/* RUTA PÚBLICA (Sin barra lateral) */}
          <Route path="/login" element={
            <RutaPublica>
              <Login />
            </RutaPublica>
            } />

          {/* RUTAS PRIVADAS (Con barra lateral) */}
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