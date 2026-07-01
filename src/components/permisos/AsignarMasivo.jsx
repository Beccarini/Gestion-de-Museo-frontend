import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Checkbox, Typography, CircularProgress, Box } from '@mui/material';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getIntegrantes, asignarPermisoMasivo } from '../../services/integranteService';

const AsignarMasivo = ({ open, onClose, permisoSeleccionado, onAsignacionExitosa }) => {
    const [integrantes, setIntegrantes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (open) {
            cargarIntegrantes();
            setSeleccionados([]);
            setBusqueda('');
        }
    }, [open]);

    const cargarIntegrantes = async () => {
        setLoading(true);
        try {
            const data = await getIntegrantes('', '', 1, 200);                        
            setIntegrantes(data.integrantes);
            
        } catch (error) {
            console.error("Fallo al cargar integrantes. Motivo:", error);
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

    const handleSeleccionarTodos = () => {
        if (seleccionados.length === integrantesFiltrados.length) {
            setSeleccionados([]);
        } else {
            setSeleccionados(integrantesFiltrados.map(i => i.id));
        }
    };

    const handleGuardar = async () => {
        if (seleccionados.length === 0 || !permisoSeleccionado) return;
        
        setGuardando(true);
        try {
            await asignarPermisoMasivo(permisoSeleccionado.id, seleccionados);
            onAsignacionExitosa();
            onClose();
        } catch (error) {
            console.error("Error en asignación masiva:", error);
            alert("Hubo un error en la asignación masiva.");
        } finally {
            setGuardando(false);
        }
    };

    const integrantesFiltrados = integrantes.filter(i => 
        i.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        (i.legajo && i.legajo.toString().includes(busqueda))
    );

    return (
        <Dialog open={open} onClose={!guardando ? onClose : undefined} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                Asignar "{permisoSeleccionado?.descripcion}"
            </DialogTitle>
            
            <DialogContent dividers sx={{ p: 0 }}>
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Buscar por nombre o legajo..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : integrantesFiltrados.length === 0 ? (
                    <Typography color="text.secondary" sx={{ p: 4, textAlign: 'center' }}>
                        No se encontraron integrantes.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleSeleccionarTodos} dense sx={{ bgcolor: 'action.hover' }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={seleccionados.length > 0 && seleccionados.length === integrantesFiltrados.length}
                                        indeterminate={seleccionados.length > 0 && seleccionados.length < integrantesFiltrados.length}
                                        tabIndex={-1}
                                        disableRipple
                                    />
                                </ListItemIcon>
                                <ListItemText primary={<Typography fontWeight="bold">Seleccionar todos</Typography>} />
                            </ListItemButton>
                        </ListItem>
                        
                        {integrantesFiltrados.map((integrante) => {
                            const labelId = `checkbox-list-label-${integrante.id}`;
                            return (
                                <ListItem key={integrante.id} disablePadding>
                                    <ListItemButton onClick={() => handleToggle(integrante.id)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={seleccionados.indexOf(integrante.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputprops={{ 'aria-labelledby': labelId }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText 
                                            id={labelId} 
                                            primary={integrante.nombre} 
                                            secondary={`Legajo: ${integrante.legajo} - ${integrante.carrera}`} 
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
                    {guardando ? 'Asignando...' : `Asignar a ${seleccionados.length} integrante(s)`}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AsignarMasivo;