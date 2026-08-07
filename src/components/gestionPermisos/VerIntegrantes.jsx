import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, IconButton, CircularProgress, Box, Typography, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { getIntegrantesPorPermiso } from '../../services/permisoService';
import { desvincularPermiso } from '../../services/integranteService';

const VerIntegrantes = ({ open, onClose, permisoSeleccionado }) => {
    const [integrantes, setIntegrantes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && permisoSeleccionado) {
            cargarIntegrantes();
        } else {
            setIntegrantes([]);
        }
    }, [open, permisoSeleccionado]);

    const cargarIntegrantes = async () => {
        setLoading(true);
        try {
            const data = await getIntegrantesPorPermiso(permisoSeleccionado.id);
            setIntegrantes(data.integrantes || data || []); 
        } catch (error) {
            console.error("Error al cargar los integrantes del permiso:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDesvincular = async (integranteId, nombre) => {
        if (window.confirm(`¿Seguro que querés revocar este permiso a ${nombre}?`)) {
            try {
                await desvincularPermiso(integranteId, permisoSeleccionado.id);
                setIntegrantes(integrantes.filter(i => i.id !== integranteId));
            } catch (error) {
                console.error("Error al desvincular:", error);
                alert("Hubo un error al revocar el permiso.");
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                Integrantes con acceso: {permisoSeleccionado?.descripcion}
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 0 }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : integrantes.length === 0 ? (
                    <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                        No hay ningún integrante asignado a este permiso actualmente.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
                        {integrantes.map((integrante) => (
                            <ListItem 
                                key={integrante.id} 
                                divider
                                secondaryAction={
                                    <Tooltip title="Revocar permiso">
                                        <IconButton 
                                            edge="end" 
                                            color="error" 
                                            onClick={() => handleDesvincular(integrante.id, integrante.nombre)}
                                        >
                                            <PersonRemoveIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            >
                                <ListItemText 
                                    primary={<Typography fontWeight="500">{integrante.nombre}</Typography>} 
                                    secondary={`Legajo: ${integrante.legajo} - ${integrante.carrera}`} 
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={onClose} color="primary" variant="contained">
                    Cerrar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default VerIntegrantes;