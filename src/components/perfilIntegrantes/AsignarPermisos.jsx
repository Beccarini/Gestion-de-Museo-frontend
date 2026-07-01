import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Typography, CircularProgress, Box } from '@mui/material';
import { getPermisos } from '../../services/permisoService';
import { asignarMultiplesPermisos } from '../../services/integranteService';

const AsignarPermisos = ({ open, onClose, integranteId, permisosActuales, onAsignacionExitosa }) => {
    const [todosLosPermisos, setTodosLosPermisos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (open) {
            cargarPermisosDisponibles();
            setSeleccionados([]);
        }
    }, [open]);

    const cargarPermisosDisponibles = async () => {
        setLoading(true);
        try {
            const data = await getPermisos(1, 100); 
            
            const idsActuales = permisosActuales.map(p => p.id);
            const disponibles = data.permisos.filter(p => !idsActuales.includes(p.id));
            
            setTodosLosPermisos(disponibles);
        } catch (error) {
            console.error("Error al cargar permisos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = (id) => {
        const currentIndex = seleccionados.indexOf(id);
        const nuevosSeleccionados = [...seleccionados];

        if (currentIndex === -1) {
            nuevosSeleccionados.push(id);
        } else {
            nuevosSeleccionados.splice(currentIndex, 1);
        }
        setSeleccionados(nuevosSeleccionados);
    };

    const handleGuardar = async () => {
        if (seleccionados.length === 0) return;
        
        setGuardando(true);
        try {
            await asignarMultiplesPermisos(integranteId, seleccionados);
            onAsignacionExitosa(); 
            onClose(); 
        } catch (error) {
            console.error("Error al asignar permisos:", error);
            alert("Hubo un error al asignar los permisos.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <Dialog open={open} onClose={!guardando ? onClose : undefined} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">Asignar Nuevos Permisos</DialogTitle>
            
            <DialogContent dividers>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : todosLosPermisos.length === 0 ? (
                    <Typography color="text.secondary" textalign="center" sx={{ p: 2 }}>
                        Este integrante ya posee todos los permisos disponibles.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {todosLosPermisos.map((permiso) => {
                            const labelId = `checkbox-list-label-${permiso.id}`;
                            return (
                                <ListItem key={permiso.id} disablePadding>
                                    <ListItemButton role={undefined} onClick={() => handleToggle(permiso.id)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={seleccionados.indexOf(permiso.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText 
                                            id={labelId} 
                                            primary={permiso.descripcion} 
                                            secondary={`${permiso.horaInicio} - ${permiso.horaFin}`} 
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="inherit" disabled={guardando}>
                    Cancelar
                </Button>
                <Button 
                    onClick={handleGuardar} 
                    variant="contained" 
                    color="primary" 
                    disabled={seleccionados.length === 0 || guardando}
                >
                    {guardando ? 'Asignando...' : `Asignar (${seleccionados.length})`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AsignarPermisos;