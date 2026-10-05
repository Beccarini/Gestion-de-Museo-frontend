import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { CssBaseline, Box, List, ListItem, ListItemButton, ListItemText, Typography, ListItemIcon, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import EventIcon from '@mui/icons-material/Event';
import WorkIcon from '@mui/icons-material/Work';
import GridViewIcon from '@mui/icons-material/GridView';
import LogoutIcon from '@mui/icons-material/Logout';
// Contexto
import { AuthProvider, useAuth } from './context/AuthContext';

// Páginas
import Login from './pages/Login';
import { GestionRegistro } from './pages/GestionRegistros.jsx';
import GestionIntegrantes from './pages/GestionIntegrantes';
import PerfilIntegrante from './pages/PerfilIntegrante';
import GestionPermisos from './pages/GestionPermisos.jsx';
import Dashboard from './pages/Dashboard.jsx';
import { GestionRecurso } from './pages/GestionRecurso.jsx';
const drawerWidth = 240;
import { GestionEventos } from './pages/GestionEvento.jsx';
import { PerfilEvento } from './pages/PerfilEvento.jsx';
import GestionProyectos from './pages/GestionProyectos.jsx';
import { GestionPlantilla } from './pages/GestionPlantilla.jsx';
import { PerfilProyecto } from './pages/PerfilProyecto.jsx';
import { PerfilPlantilla } from './pages/PerfilPlantilla.jsx';
import PerfilPermiso from './pages/PerfilPermiso.jsx';

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Integrantes', path: '/integrantes', icon: <PeopleIcon /> },
  { text: 'Registros', path: '/registros', icon: <AccessTimeFilledIcon /> },
  { text: 'Permisos', path: '/permisos', icon: <VpnKeyIcon /> },
  { text: 'Proyectos', path: '/proyectos', icon: <WorkIcon /> },
  { text: 'Eventos', path: '/eventos', icon: <EventIcon /> },
  { text: 'Plantilla de evento', path: '/plantillas', icon: <GridViewIcon /> },
  { text: 'Inventario', path: '/recursos', icon: <WorkIcon />},
];


const RutaPublica = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
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
      <Box sx={{ 
      width: drawerWidth, 
      borderRight: '1px solid #e2e8f0', 
      backgroundColor: '#ffffff', 
      display: 'flex', 
      flexDirection: 'column',
      height: '100vh' 
    }}>
      {/* TÍTULO DEL SISTEMA */}
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ fontWeight: 800, fontSize: '1.3rem', color: '#1e293b' }}>
          Sistema <span style={{ color: '#2563eb' }}>MUIC</span>
        </Typography>
      </Box>
      
      {/* MENÚ PRINCIPAL */}
      <List sx={{ flexGrow: 1, px: 1.5 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton 
              component={NavLink} 
              to={item.path}
              sx={{
                borderRadius: '10px',
                '&.active': { 
                  backgroundColor: '#eff6ff', 
                  color: '#2563eb',
                  '& .MuiListItemIcon-root': { color: '#2563eb' }
                },
                '&:hover': { backgroundColor: '#f8fafc' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40, color: '#64748b' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontSize: '0.95rem', fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* CERRAR SESIÓN */}
      <Divider sx={{ my: 1 }} />
      <List sx={{ px: 1.5, mb: 2 }}>
        <ListItem disablePadding>
          <ListItemButton 
            onClick={logout} 
            sx={{ 
              borderRadius: '10px',
              '&:hover': { backgroundColor: '#fef2f2' } 
            }}
          >
            <ListItemIcon sx={{ minWidth: 40, color: '#ef4444' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Cerrar Sesión" 
              primaryTypographyProps={{ color: '#ef4444', fontWeight: 600, fontSize: '0.95rem' }} 
            />
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
          p: 0, 
          width: `calc(100% - ${drawerWidth}px)`, 
          height: '100vh',
          overflow: 'auto' 
        }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/registros" element={<GestionRegistro />} />
          <Route path="/integrantes" element={<GestionIntegrantes />} />
          <Route path="/integrantes/:id" element={<PerfilIntegrante />} />
          <Route path="/permisos" element={<GestionPermisos />} />
          <Route path="/permisos/:id" element={<PerfilPermiso />} />
          <Route path="/proyectos" element={<GestionProyectos />} />
          <Route path="/proyectos/:id" element={<PerfilProyecto/>} />
          <Route path="/eventos" element={<GestionEventos />} />
          <Route path="/eventos/:id" element={<PerfilEvento />} />
          <Route path="/plantillas" element={<GestionPlantilla />} />
          <Route path="/plantillas/:id" element={<PerfilPlantilla />} />
          <Route path="/recursos" element={<GestionRecurso/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
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