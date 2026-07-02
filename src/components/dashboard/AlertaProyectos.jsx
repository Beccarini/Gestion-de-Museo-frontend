import React, { useState } from 'react';
import { 
    Button, Paper, Typography, Box, TextField, InputAdornment, Chip, Divider 
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SearchIcon from '@mui/icons-material/Search';
import { Link as RouterLink } from 'react-router-dom';

export const AlertaProyectos = ({ projects = [] }) => {
    const [busqueda, setBusqueda] = useState('');


    return (
        <Paper sx={{ 
            p: 3, 
            borderRadius: 3, 
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            border: '1px solid #f1f5f9'
        }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: '700' }}>Proyectos</Typography>
            
            <Box sx={{ flexGrow: 1, overflowY: 'auto', pr: 1 }}>
                {projects.length > 0 ? (
                    projects.map(p => (
                        <Box key={p.id} sx={{ 
                            mb: 2, 
                            p: 2, 
                            bgcolor: '#f8fafc', 
                            borderRadius: 2, 
                            border: '1px solid #e2e8f0',
                            transition: '0.2s',
                            '&:hover': { bgcolor: '#f1f5f9' }
                        }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                <Typography variant="body1" fontWeight="600" sx={{ color: '#1e293b' }}>
                                    {p.nombre}
                                </Typography>
                                <Chip label={p.estado || 'Activo'} size="small" color="primary" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                            </Box>
                            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                {p.descripcion || 'Sin descripción'}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 5, textAlign: 'center' }}>
                        No se encontraron proyectos.
                    </Typography>
                )}
            </Box>

            <Divider sx={{ my: 1 }} />
            
            <Button 
                component={RouterLink} 
                to="/proyectos" 
                endIcon={<ArrowForwardIcon />} 
                sx={{ mt: 1, textTransform: 'none', fontWeight: 600 }}
            >
                Ver todos los proyectos
            </Button>
        </Paper>
    );
};

export default AlertaProyectos;