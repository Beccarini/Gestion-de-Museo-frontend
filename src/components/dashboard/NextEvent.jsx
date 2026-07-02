import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

export const NextEvents = ({ events = [] }) => (
    <Paper sx={{ 
        p: 3, 
        borderRadius: 3, 
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', 
        height: '400px', 
        display: 'flex', 
        flexDirection: 'column',
        border: '1px solid #f1f5f9'
    }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: '700' }}>Eventos</Typography>

        <Box sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            pr: 1, 
            mt: 1 
        }}>
            {events.length > 0 ? events.map(ev => (
                <Box key={ev.id} sx={{ 
                    mb: 2, 
                    p: 2, 
                    bgcolor: '#f8fafc', 
                    borderRadius: 2, 
                    border: '1px solid #e2e8f0',
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 0.5,
                    transition: '0.2s',
                    '&:hover': { bgcolor: '#f1f5f9' }
                }}>
                    <Typography variant="subtitle2" fontWeight="bold" sx={{ color: '#1e293b' }}>
                        {ev.nombre}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                        <EventAvailableIcon sx={{ fontSize: 16 }} />
                        <Typography variant="caption" fontWeight="600">
                            {ev.fechaInicio ? ev.fechaInicio.toLocaleDateString() : 'Sin fecha'}
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
                <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 5, textAlign: 'center' }}>
                    No hay eventos programados.
                </Typography>
            )}
        </Box>

        <Button 
            component={RouterLink} 
            to="/eventos" 
            endIcon={<ArrowForwardIcon />} 
            sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
        >
            Ir a Eventos
        </Button>
    </Paper>
);

export default NextEvents;