import React from 'react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography, Box } from '@mui/material';

export const AlertaProyectos = ({ projects }) => (
    <Paper sx={{ 
        p: 3, 
        borderRadius: 3, 
        height: '100%', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
    }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: '700' }}>Proyectos Activos</Typography>
        
        {projects.length > 0 ? (
            projects.map(p => (
                <Box key={p.id} sx={{ 
                    mb: 2, 
                    p: 2, 
                    bgcolor: '#f8f9fa', 
                    borderRadius: 2, 
                    border: '1px solid #f0f0f0' 
                }}>
                    <Typography variant="body1" fontWeight="600" sx={{ color: '#2c3e50' }}>
                        {p.nombre}
                    </Typography>
                </Box>
            ))
        ) : (
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No hay proyectos activos.
            </Typography>
        )}
        <Button 
            component={RouterLink} 
            to="/proyectos" 
            endIcon={<ArrowForwardIcon />} 
            sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
        >
            Ir a Proyectos
        </Button>
    </Paper>
);

export default AlertaProyectos;