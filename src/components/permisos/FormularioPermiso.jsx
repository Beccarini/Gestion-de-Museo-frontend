import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, Select, InputLabel, FormControl, Chip, OutlinedInput } from '@mui/material';

const DIAS_OPCIONES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const FormularioPermiso = ({ open, onClose, permisoAEditar, onGuardar }) => {
    const [formData, setFormData] = useState({
        descripcion: '',
        diasSemana: [],
        horaInicio: '',
        horaFin: ''
    });

    // Cargar datos si estamos editando
    useEffect(() => {
        if (permisoAEditar) {
            setFormData({
                descripcion: permisoAEditar.descripcion,
                diasSemana: permisoAEditar.diasSemana,
                horaInicio: permisoAEditar.horaInicio,
                horaFin: permisoAEditar.horaFin
            });
        } else {
            setFormData({ descripcion: '', diasSemana: [], horaInicio: '', horaFin: '' });
        }
    }, [permisoAEditar, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onGuardar(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                {permisoAEditar ? 'Editar Permiso' : 'Nuevo Permiso'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        
                        <TextField
                            label="Descripción del Permiso"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            required
                            placeholder="Ej: Turno Mañana Estándar"
                        />

                        <FormControl fullWidth required>
                            <InputLabel id="dias-label">Días Permitidos</InputLabel>
                            <Select
                                labelId="dias-label"
                                name="diasSemana"
                                multiple
                                value={formData.diasSemana}
                                onChange={handleChange}
                                input={<OutlinedInput label="Días Permitidos" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} size="small" />
                                        ))}
                                    </Box>
                                )}
                            >
                                {DIAS_OPCIONES.map((dia) => (
                                    <MenuItem key={dia} value={dia}>{dia}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Hora de Inicio"
                                name="horaInicio"
                                type="time"
                                value={formData.horaInicio || ''}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ 
                                    shrink: true 
                                }}
                                slotProps={{ 
                                    inputLabel: { shrink: true } 
                                }}
                            />
                            <TextField
                                label="Hora de Fin"
                                name="horaFin"
                                type="time"
                                value={formData.horaFin || ''}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ 
                                    shrink: true 
                                }}
                                slotProps={{ 
                                    inputLabel: { shrink: true } 
                                }}
                            />
                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormularioPermiso;