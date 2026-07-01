import React from 'react';
import { Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';
import { Paper, Typography, Box, Chip } from '@mui/material';

export const RegistrosRecientes = ({ records }) => (
    <Paper sx={{ p: 4, borderRadius: 4, boxShadow: '0 8px 24px rgba(0,0,0,0.05)' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>Últimos Accesos</Typography>
        
        {records.length > 0 ? records.map(r => (
            <Box key={r.id} sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                py: 2, 
                borderBottom: '1px solid #f0f0f0', 
                '&:last-child': { borderBottom: 0 } 
            }}>
                <Box>
                    {/* Nombre del participante */}
                    <Typography variant="body1" fontWeight="600" sx={{ color: '#333' }}>
                        {r.integranteNombre || `ID: ${r.integranteId}`}
                    </Typography>
                    
                    {/* Etiquetas de estado (Asistencia/Apertura) */}
                    <Box sx={{ mt: 0.5, display: 'flex', gap: 1 }}>
                        {r.esAsistencia && (
                            <Chip label="Asistencia" size="small" color="success" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                        )}
                        {r.esApertura && (
                            <Chip label="Apertura" size="small" color="primary" variant="outlined" sx={{ fontSize: '0.7rem' }} />
                        )}
                    </Box>
                </Box>

                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {new Date(r.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
                
            </Box>
            
        )) : (
            <Typography variant="body2" color="text.secondary">No hay registros recientes.</Typography>
        )}
        <Button 
            component={RouterLink} 
            to="/registros" 
            endIcon={<ArrowForwardIcon />} 
            sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
        >
            Ir a Registros
        </Button>
    </Paper>
);

export default RegistrosRecientes;