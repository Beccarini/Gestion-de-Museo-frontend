import React from "react";
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export function MostrarEvento({ evento }){
    return (
        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 4, borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1e293b' }}>
                {evento.nombre}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Typography variant="subtitle1" color="text.secondary">
                    Categoría / Tipo:
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#0288d1' }}>
                    {evento.tipo || 'Otro'}
                </Typography>
            </Box>
            
            <Divider sx={{ my: 3, borderColor: '#f8fafc' }} />
            
            <Grid container spacing={4}>
                {/* Columna de Descripción */}
                <Grid item xs={12} md={7}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>
                        Descripción
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6 }}>
                        {evento.descripcion || 'Sin descripción disponible.'}
                    </Typography>
                </Grid>

                {/* Columna de Fechas */}
                <Grid item xs={12} md={5} sx={{ borderLeft: { md: '1px solid #f0f0f0' }, pl: { md: 4 } }}>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
                        Fechas del Evento
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                        <CalendarMonthIcon sx={{ color: '#94a3b8' }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">INICIO</Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                                {evento.fechaInicio 
                                    ? new Date(evento.fechaInicio).toLocaleString('es-AR', { hour: '2-digit', minute:'2-digit', day:'2-digit', month:'2-digit', year:'numeric' }) 
                                    : 'No definida'
                                }
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CalendarMonthIcon sx={{ color: '#94a3b8' }} />
                        <Box>
                            <Typography variant="caption" color="text.secondary" display="block">FIN</Typography>
                            <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                                {evento.fechaFin 
                                    ? new Date(evento.fechaFin).toLocaleString('es-AR', { hour: '2-digit', minute:'2-digit', day:'2-digit', month:'2-digit', year:'numeric' }) 
                                    : 'No definida'
                                }
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
}