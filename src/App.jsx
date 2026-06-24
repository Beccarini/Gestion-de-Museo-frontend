import React from 'react';
import GestionIntegrantes from './pages/GestionIntegrantes';
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