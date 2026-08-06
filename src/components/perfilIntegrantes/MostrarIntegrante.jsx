import React, { useState } from 'react';
import { 
    Box, Typography, Chip, IconButton, Menu, MenuItem, 
    ListItemIcon, ListItemText, Avatar, Card 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

const MostrarIntegrante = ({ integrante, onAbrirEditar, onCambiarEstado, onEliminar }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAccion = (accion) => {
        handleCloseMenu();
        if (accion === 'editar') {
            onAbrirEditar();
        } else if (accion === 'estado') {
            onCambiarEstado();
        } else if (accion === 'eliminar') {
            if(onEliminar) onEliminar();
        }
    };

    const inicial = integrante?.nombre ? integrante.nombre.charAt(0).toUpperCase() : '';

    return (
        <Card variant="outlined" sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            p: { xs: 2, md: 3 },
            mb: 4,
            borderRadius: 2,
            borderColor: '#e2e8f0', 
            bgcolor: 'background.paper' 
        }}>
            
            <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                    <Avatar sx={{ width: 80, height: 80, fontSize: '2.5rem', bgcolor: '#1976d2' }}>
                        {inicial}
                    </Avatar>
                    <Chip 
                        label={integrante.esActivo ? "Activo" : "Inactivo"} 
                        color={integrante.esActivo ? "success" : "default"} 
                        size="small" 
                        sx={{fontWeight: 'bold'}}
                    />
                </Box>

                <Box>
                    <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 500 }}>
                        {integrante.nombre}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 5 }}>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Legajo</Typography>
                            <Typography variant="body1">{integrante.legajo}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Carrera</Typography>
                            <Typography variant="body1">{integrante.carrera || '—'}</Typography>
                        </Box>
                        <Box>
                            <Typography variant="body2" color="text.secondary">Token</Typography>
                            <Typography variant="body1">{integrante.token || 'Sin asignar'}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>


            <Box sx={{ alignSelf: 'flex-start' }}> 
                <IconButton 
                    aria-label="opciones" 
                    onClick={handleClickMenu}
                    sx={{ mt: -1, mr: -1 }} 
                >
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
                        <ListItemIcon>
                            <EditIcon fontSize="small" color="primary" />
                        </ListItemIcon>
                        <ListItemText>Editar Integrante</ListItemText>
                    </MenuItem>
                    
                    <MenuItem onClick={() => handleAccion('eliminar')}>
                        <ListItemIcon>
                            <DeleteIcon fontSize="small" color="error" />
                        </ListItemIcon>
                        <ListItemText sx={{ color: 'error.main' }}>
                            Eliminar Integrante
                        </ListItemText>
                    </MenuItem>
                    
                    <MenuItem onClick={() => handleAccion('estado')}>
                        <ListItemIcon>
                            {integrante.esActivo ? (
                                <BlockIcon fontSize="small" color="warning" />
                            ) : (
                                <CheckIcon fontSize="small" color="success" />
                            )}
                        </ListItemIcon>
                        <ListItemText sx={{ color: integrante.esActivo ? 'warning.main' : 'success.main' }}>
                            {integrante.esActivo ? 'Dar de Baja' : 'Dar de Alta'}
                        </ListItemText>
                    </MenuItem>
                </Menu>
            </Box>

        </Card>
    );
};

export default MostrarIntegrante;