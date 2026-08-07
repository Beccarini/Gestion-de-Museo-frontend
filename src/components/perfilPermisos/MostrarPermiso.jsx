import React, { useState } from 'react';
import { 
    Box, Typography, IconButton, Menu, MenuItem, 
    ListItemIcon, ListItemText, Card, Chip, Divider
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SecurityIcon from '@mui/icons-material/Security';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const MostrarPermiso = ({ permiso, onAbrirEditar, onEliminar }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => setAnchorEl(event.currentTarget);
    const handleCloseMenu = () => setAnchorEl(null);

    const handleAccion = (accion) => {
        handleCloseMenu();
        if (accion === 'editar' && onAbrirEditar) onAbrirEditar();
        if (accion === 'eliminar' && onEliminar) onEliminar();
    };

    if (!permiso) return null;

    const dias = Array.isArray(permiso.diasSemana) ? permiso.diasSemana : [];

    return (
        <Card variant="outlined" sx={{ 
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 2,
            borderColor: '#e2e8f0', 
            bgcolor: 'background.paper',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ 
                        backgroundColor: 'rgba(25, 118, 210, 0.1)', 
                        p: 1.5, 
                        borderRadius: 2, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }}>
                        <SecurityIcon color="primary" fontSize="large" />
                    </Box>
                    <Box>
                        <Typography variant="body2" color="text.secondary" fontWeight="bold" sx={{ mb: 0.5 }}>
                            DETALLES DEL PERMISO
                        </Typography>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                            {permiso.descripcion}
                        </Typography>
                    </Box>
                </Box>

                <Box sx={{ mt: -1, mr: -1 }}> 
                    <IconButton aria-label="opciones" onClick={handleClickMenu}>
                        <MoreVertIcon />
                    </IconButton>
                    
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={() => handleAccion('editar')}>
                            <ListItemIcon><EditIcon fontSize="small" color="primary" /></ListItemIcon>
                            <ListItemText>Editar Permiso</ListItemText>
                        </MenuItem>
                        <MenuItem onClick={() => handleAccion('eliminar')}>
                            <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
                            <ListItemText sx={{ color: 'error.main' }}>Eliminar Permiso</ListItemText>
                        </MenuItem>
                    </Menu>
                </Box>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 4 }}>
                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <CalendarMonthIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="subtitle2" color="text.secondary">DÍAS HABILITADOS</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', pl: 4 }}>
                        {dias.length > 0 ? (
                            dias.map((dia, index) => (
                                <Chip key={index} label={dia} color="primary" variant="outlined" size="small" sx={{ fontWeight: 500 }}/>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">No hay días especificados.</Typography>
                        )}
                    </Box>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                        <Typography variant="subtitle2" color="text.secondary">FRANJA HORARIA</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ pl: 4, fontWeight: 500, fontFamily: 'monospace', fontSize: '1.1rem' }}>
                        {permiso.horaInicio || '--:--'} hs a {permiso.horaFin || '--:--'} hs
                    </Typography>
                </Box>
            </Box>

        </Card>
    );
};

export default MostrarPermiso;