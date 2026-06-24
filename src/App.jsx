import React from 'react';
// Ahora importamos la vista desde la nueva carpeta 'pages'
import GestionIntegrantes from './pages/GestionIntegrantes';

// Mantenemos el reseteo de estilos si están usando Material UI
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      
      <main style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingTop: '20px' }}>
        
        <GestionIntegrantes />
        
      </main>
    </>
  );
}

export default App;