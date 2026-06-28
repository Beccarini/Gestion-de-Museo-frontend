import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { CssBaseline, Box, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { GestionRegistro } from './pages/GestionRegistros.jsx';
import GestionIntegrantes from './pages/GestionIntegrantes';
import PerfilIntegrante from './pages/PerfilIntegrante';

const drawerWidth = 240; // Ancho fijo para tu barra lateral

function App() {
  const menuItems = [
    { text: 'DashBoard', path: '/' },
    { text: 'Integrantes', path: '/integrantes' },
    { text: 'Registros', path: '/registros' },
    { text: 'Permisos', path: '/config' },
    { text: 'Eventos', path: '/eventos' },
    { text: 'Proyectos', path: '/proyectos' },

  ];

  return (
    <BrowserRouter>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        
        {/* BARRA LATERAL */}
        <Box sx={{ width: drawerWidth, borderRight: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
          <Typography sx={{ p: 3, fontWeight: 'bold', fontSize: '1.2rem', color: '#1a73e8' }}>
            Mi App
          </Typography>
          <List>
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
        </Box>

        {/* CONTENIDO PRINCIPAL */}
        <Box component="main" sx={{ flexGrow: 1, backgroundColor: '#fafafa', p: 3 }}>
          <Routes>
            <Route path="/registros" element={<GestionRegistro />} />
            <Route path="/integrantes" element={<GestionIntegrantes />} />
            <Route path="/integrantes/:id" element={<PerfilIntegrante />} />
          </Routes>
        </Box>

      </Box>
    </BrowserRouter>
  );
}

export default App;