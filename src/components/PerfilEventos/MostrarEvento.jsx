import React, { useState } from "react";
import { 
    Box, Typography, Paper, Avatar, Chip,
    IconButton, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventIcon from '@mui/icons-material/Event';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export function MostrarEvento({ evento, onEditar, onEliminar }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleAction = (action) => {
        handleMenuClose();
        if (action === 'editar' && onEditar) onEditar();
        if (action === 'eliminar' && onEliminar) onEliminar();
    };

    return (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 2, borderColor: '#e2e8f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                
                <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: '#1976d2' }}>
                        <EventIcon fontSize="large" />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 500, color: '#0f172a' }}>
                            {evento.nombre}
                        </Typography>
                        <Chip 
                            label={evento.tipo || 'General'} 
                            color="info" 
                            size="small" 
                            variant="outlined" 
                            sx={{ mt: 1, fontWeight: 'bold' }} 
                        />
                    </Box>
                </Box>

                <Box>
                    <IconButton onClick={handleMenuClick} sx={{ mt: -1, mr: -1 }}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleMenuClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => handleAction('editar')}>
                            <ListItemIcon><EditIcon fontSize="small" color="primary" /></ListItemIcon>
                            <ListItemText>Editar Evento</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleAction('eliminar')}>
                            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                            <ListItemText sx={{ color: 'error.main' }}>Eliminar Evento</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', md: 'row' }, 
                gap: 3, 
                mt: 3,
                alignItems: 'stretch' 
            }}>
                
                <Box sx={{ 
                    width: { xs: '100%', md: '35%' },
                    flexShrink: 0,
                    border: '1px solid #e2e8f0', 
                    bgcolor: '#f8fafc', 
                    p: 3, 
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', mb: 3, letterSpacing: 0.5 }}>
                        PROGRAMACIÓN
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
                        <CalendarMonthIcon sx={{ color: '#64748b', fontSize: 28 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                INICIO
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                {evento.fechaInicio 
                                    ? new Date(evento.fechaInicio).toLocaleString('es-AR', { hour: '2-digit', minute:'2-digit', day:'2-digit', month:'short', year:'numeric' }) 
                                    : 'No definida'}
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <CalendarMonthIcon sx={{ color: '#64748b', fontSize: 28 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                FIN
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                {evento.fechaFin 
                                    ? new Date(evento.fechaFin).toLocaleString('es-AR', { hour: '2-digit', minute:'2-digit', day:'2-digit', month:'short', year:'numeric' }) 
                                    : 'No definida'}
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ 
                    flexGrow: 1, 
                    border: '1px solid #e2e8f0', 
                    bgcolor: '#f8fafc', 
                    p: 3, 
                    borderRadius: 2
                }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', mb: 2, letterSpacing: 0.5 }}>
                        DESCRIPCIÓN DEL EVENTO
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7 }}>
                        {evento.descripcion || 'No se proporcionó una descripción para este evento.'}
                    </Typography>
                </Box>

            </Box>
        </Paper>
    );
}