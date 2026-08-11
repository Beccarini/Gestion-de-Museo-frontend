import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, Button, 
    List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
    Checkbox, Typography, CircularProgress, Box, TextField, InputAdornment 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getIntegrantes, asignarPermisoMasivo } from '../../services/integranteService';
import { getIntegrantesPorPermiso } from '../../services/permisoService';

const AsignarMasivo = ({ open, onClose, permisoSeleccionado, onAsignacionExitosa }) => {
    const [integrantes, setIntegrantes] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [seleccionados, setSeleccionados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        if (open && permisoSeleccionado) {
            cargarIntegrantes();
            setSeleccionados([]);
            setBusqueda('');
        }
    }, [open, permisoSeleccionado]);

    const cargarIntegrantes = async () => {
        setLoading(true);
        try {
            const [dataTodos, dataAsignados] = await Promise.all([
                getIntegrantes('', '', 1, 200),
                getIntegrantesPorPermiso(permisoSeleccionado.id)
            ]);

            const todosLosIntegrantes = dataTodos.integrantes || [];
            
            let integrantesYaAsignados = [];
            if (Array.isArray(dataAsignados)) {
                integrantesYaAsignados = dataAsignados;
            } else if (dataAsignados && Array.isArray(dataAsignados.integrantes)) {
                integrantesYaAsignados = dataAsignados.integrantes;
            } else if (dataAsignados && Array.isArray(dataAsignados.data)) {
                 integrantesYaAsignados = dataAsignados.data;
            }

            const idsAsignados = integrantesYaAsignados.map(int => int.id);

            const integrantesDisponibles = todosLosIntegrantes.filter(
                int => !idsAsignados.includes(int.id)
            );

            setIntegrantes(integrantesDisponibles);
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

    const handleGuardar = async () => {
        setGuardando(true);
        try {

            const promesas = seleccionados.map(integranteId =>
                asignarPermisoMasivo(integranteId, permisoSeleccionado.id)
            );
            await Promise.all(promesas);

            if (onAsignacionExitosa) onAsignacionExitosa();
            onClose();
        } catch (error) {
            console.error("Error al asignar integrantes:", error);
            alert("Error al intentar asignar los integrantes.");
        } finally {
            setGuardando(false);
        }
    };

    const integrantesFiltrados = integrantes.filter(int => 
        int.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
        (int.legajo && int.legajo.toString().includes(busqueda))
    );

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                Asignar a: {permisoSeleccionado?.descripcion}
            </DialogTitle>
            
            <DialogContent dividers sx={{ minHeight: '300px' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    placeholder="Buscar por nombre o legajo..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    sx={{ mb: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress />
                    </Box>
                ) : integrantesFiltrados.length === 0 ? (
                    <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
                        No se encontraron integrantes disponibles para asignar.
                    </Typography>
                ) : (
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {integrantesFiltrados.map((integrante) => {
                            const labelId = `checkbox-list-label-${integrante.id}`;
                            return (
                                <ListItem key={integrante.id} disablePadding divider>
                                    <ListItemButton role={undefined} onClick={() => handleToggle(integrante.id)} dense>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={seleccionados.indexOf(integrante.id) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ 'aria-labelledby': labelId }}
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