import { useState } from 'react'
import './App.css'
import {GestionRegistro} from './pages/GestionRegistros.jsx'
import React from 'react';
import GestionIntegrantes from './pages/GestionIntegrantes';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <main style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingTop: '20px' }}>
        
        <GestionRegistro/>
        
      </main>
    </>
  );
}

export default App;