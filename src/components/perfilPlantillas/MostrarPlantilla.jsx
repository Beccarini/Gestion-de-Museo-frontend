import React, { useState } from "react";
import { 
    Box, Typography, Paper, Avatar, Chip,
    IconButton, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import BlockIcon from '@mui/icons-material/Block';

export function MostrarPlantilla({ plantilla, onEditar, onEliminar, onToggleEstado }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleAction = (action) => {
        handleMenuClose();
        if (action === 'editar' && onEditar) onEditar();
        if (action === 'eliminar' && onEliminar) onEliminar();
        if (action === 'toggle' && onToggleEstado) onToggleEstado();
    };

    const getDiaTexto = (diaNum) => {
        const dias = { 0: 'Domingo', 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' };
        return dias[diaNum] || 'Día no definido';
    };

    return (
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mb: 4, borderRadius: 2, borderColor: '#e2e8f0' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                
                <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: '#6366f1' }}>
                        <EventRepeatIcon fontSize="large" />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 500 }}>
                            {plantilla.nombre}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>    
                            <Chip 
                                label={plantilla.activo ? 'Activo' : 'Inactivo'} 
                                color={plantilla.activo ? 'success' : 'default'} 
                                size="small" 
                                sx={{textTransform: 'bold'}}
                            />
                            <Chip 
                                label={plantilla.tipo || 'Clase'} 
                                color="info" 
                                size="small" 
                                variant="outlined" 
                                sx={{ fontWeight: 'bold', textTransform: 'capitalize' }} 
                            />
                        </Box>
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
                            <ListItemText>Editar Plantilla</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleAction('toggle')}>
                            <ListItemIcon>
                                {plantilla.activo 
                                    ? <BlockIcon fontSize="small" color="warning" /> 
                                    : <CheckIcon fontSize="small" color="success" />
                                }
                            </ListItemIcon>
                            <ListItemText sx={{ color: plantilla.activo ? 'warning.main' : 'success.main' }}>
                                {plantilla.activo ? 'Desactivar Plantilla' : 'Activar Plantilla'}
                            </ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleAction('eliminar')}>
                            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                            <ListItemText sx={{ color: 'error.main' }}>Eliminar Plantilla</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3, mt: 3, alignItems: 'stretch' }}>
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
                        <InsertInvitationIcon sx={{ color: '#64748b', fontSize: 28 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                DÍA Y FRECUENCIA
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                Todos los {getDiaTexto(plantilla.diaSemana)} ({plantilla.frecuencia})
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <AccessTimeIcon sx={{ color: '#64748b', fontSize: 28 }} />
                        <Box>
                            <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 600, display: 'block', mb: 0.5 }}>
                                HORARIO
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 600, color: '#0f172a' }}>
                                {plantilla.horaInicio} hs a {plantilla.horaFin} hs
                            </Typography>
                        </Box>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, border: '1px solid #e2e8f0', bgcolor: '#f8fafc', p: 3, borderRadius: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b', mb: 2, letterSpacing: 0.5 }}>
                        DESCRIPCIÓN
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.7, mb: 3 }}>
                        {plantilla.descripcion || 'No se proporcionó una descripción para esta plantilla.'}
                    </Typography>

                    
                </Box>
            </Box>
        </Paper>
    );
}