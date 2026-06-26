import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const EncabezadoIntegrantes = ({ onAbrirModal }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4 
        }}>
            <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                Gestión de Integrantes
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />} 
                disableElevation
                onClick={onAbrirModal} 
            >                  
                Nuevo Integrante
            </Button>
        </Box>
    );
};

export default EncabezadoIntegrantes;