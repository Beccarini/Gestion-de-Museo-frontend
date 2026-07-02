import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

export const NextEvents = ({ events }) => (
    <Paper sx={{ p: 4, borderRadius: 3, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 3, fontWeight: '700' }}>Próximos Eventos</Typography>

        {/* flexGrow: 1 empuja el botón de "Ir a" siempre hacia abajo */}
        <Box sx={{ flexGrow: 1 }}>
            {events.length > 0 ? events.map(ev => (
                <Box key={ev.id} sx={{ 
                    mb: 2, 
                    p: 2, 
                    bgcolor: '#f8f9fa', 
                    borderRadius: 2, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1 
                }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#2d3748', fontSize: '0.95rem' }}>
                        {ev.nombre}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', mt: 0.5 }}>
                        <EventAvailableIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" fontWeight="500">
                            {ev.fechaInicio ? ev.fechaInicio.toLocaleDateString() : 'Sin fecha'} 
                            {ev.fechaFin && ev.fechaInicio?.toDateString() !== ev.fechaFin?.toDateString() 
                                ? ` - ${ev.fechaFin.toLocaleDateString()}` 
                                : ''}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                            {ev.fechaInicio ? ev.fechaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                            {ev.fechaFin ? ` a ${ev.fechaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                        </Typography>
                    </Box>
                </Box>
            )) : (
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                    No hay eventos programados.
                </Typography>
            )}
        </Box>

        {/* El botón con el símbolo para ir a la ruta */}
        <Button 
            component={RouterLink} 
            to="/eventos" 
            endIcon={<ArrowForwardIcon />} 
            sx={{ mt: 2, alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600 }}
        >
            Ir a Eventos
        </Button>
    </Paper>
);