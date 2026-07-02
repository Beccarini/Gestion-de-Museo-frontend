import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Typography, CircularProgress, Box } from '@mui/material';

import { getProyectos } from '../../services/proyectoService'; 
import { asignarMultiplesProyectos } from '../../services/integranteService';

const AsignarProyectos = ({ open, onClose, integranteId, proyectosActuales, onAsignacionExitosa }) => {
    const [todosLosProyectos, setTodosLosProyectos] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (open) {
            cargarProyectosDisponibles();
            setSeleccionados([]);
        }
    }, [open]);

    const cargarProyectosDisponibles = async () => {
        setLoading(true);
        try {
            const data = await getProyectos(1, 100); 
            
            // Filtramos los que el integrante ya tiene asignados
            const idsActuales = proyectosActuales.map(p => p.id);
            const disponibles = (data.proyectos || data || []).filter(p => !idsActuales.includes(p.id));
            
            setTodosLosProyectos(disponibles);
        } catch (error) {
            console.error("Error al cargar proyectos:", error);
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
            await asignarMultiplesProyectos(integranteId, seleccionados);
            onAsignacionExitosa(); 
            onClose(); 
        } catch (error) {
            console.error("Error al asignar proyectos:", error);
            alert("Hubo un error al asignar los proyectos.");
        } finally {
            setGuardando(false);
        }
    };

    return (
        <Dialog open={open} onClose={!guardando ? onClose : undefined} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">Asignar Nuevos Proyectos</DialogTitle>
            
            <DialogContent dividers>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : todosLosProyectos.length === 0 ? (
                    <Typography color="text.secondary" textAlign="center" sx={{ p: 2 }}>
                        Este integrante ya está asignado a todos los proyectos disponibles.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {todosLosProyectos.map((proyecto) => {
                            const labelId = `checkbox-list-label-${proyecto.id}`;
                            return (
                                <ListItem key={proyecto.id} disablePadding>
                                    <ListItemButton role={undefined} onClick={() => handleToggle(proyecto.id)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={seleccionados.indexOf(proyecto.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText 
                                            id={labelId} 
                                            primary={proyecto.nombre} 
                                            secondary={proyecto.estado || 'Sin estado'} 
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

export default AsignarProyectos;