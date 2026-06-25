import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AltaRegistro } from '../components/AltaRegistro';
import { MostrarBaja } from '../components/MostrarBaja';
import dayjs from 'dayjs';

export function GestionRegistro() {
    const [registros, setRegistros] = useState([]);
    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Registros (Alta y Baja)
            </Typography>
            
            {/* --- SECCIÓN DE ALTA --- */}
            <AltaRegistro registros={registros} setRegistros={setRegistros}/>
            
            {/* --- SECCIÓN DE BAJA (LISTADO) --- */}
            <MostrarBaja registros={registros} setRegistros={setRegistros}/>
        </Box>
    );
}