import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const EncabezadoIntegrantes = ({ onAbrirModal }) => {
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                        Gestión de Integrantes
                    </Typography>
                </Box>
                <Button 
                    variant="contained" color="primary" startIcon={<AddIcon />} onClick={onAbrirModal}
                    sx={{ 
                        borderRadius: '8px', fontWeight: 600, px: 3, py: 1, boxShadow: '0 4px 10px rgba(26, 115, 232, 0.3)',
                        transition: 'all 0.2s', '&:hover': { boxShadow: '0 6px 15px rgba(26, 115, 232, 0.4)', transform: 'translateY(-2px)' }
                    }}
                >
                    NUEVO INTEGRANTE
                </Button>
            </Box>
        </Box>
    );
};

export default EncabezadoIntegrantes;