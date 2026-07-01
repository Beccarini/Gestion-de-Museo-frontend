import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, IconButton, CircularProgress, Box, Typography, Tooltip } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { getIntegrantesPorProyecto, desvincularIntegranteProyecto } from '../../services/proyectoService';

const VerIntegrantesProyecto = ({ open, onClose, proyecto }) => {
    const [integrantes, setIntegrantes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open && proyecto) {
            cargarIntegrantes();
        } else {
            setIntegrantes([]);
        }
    }, [open, proyecto]);

    const cargarIntegrantes = async () => {
        setLoading(true);
        try {
            const data = await getIntegrantesPorProyecto(proyecto.id);
            setIntegrantes(data || []); 
        } catch (error) {
            console.error("Error al cargar los integrantes del proyecto:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDesvincular = async (integranteId, nombre) => {
        if (window.confirm(`¿Seguro que querés desvincular a ${nombre} de este proyecto?`)) {
            try {
                await desvincularIntegranteProyecto(proyecto.id, integranteId);
                // Recargamos la lista para que desaparezca visualmente
                cargarIntegrantes(); 
            } catch (error) {
                console.error("Error al desvincular integrante:", error);
                alert("Ocurrió un error al intentar desvincular al integrante.");
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                Integrantes del Proyecto: {proyecto?.nombre}
            </DialogTitle>
            <DialogContent dividers sx={{ minHeight: '300px' }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : integrantes.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                        No hay integrantes asignados a este proyecto.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {integrantes.map((integrante) => (
                            <ListItem 
                                key={integrante.id} 
                                divider
                                secondaryAction={
                                    <Tooltip title="Desvincular del proyecto">
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
                                    secondary={`Legajo: ${integrante.legajo || 'N/A'} - ${integrante.carrera || 'N/A'}`} 
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

export default VerIntegrantesProyecto;