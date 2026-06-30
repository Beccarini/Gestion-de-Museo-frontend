// src/components/gestionEventos/AltaEvento.jsx
import React, { useState } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, Box, MenuItem 
} from '@mui/material';

// Importaciones para los date-pickers que corrigen el bug visual
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { TIPOS_EVENTO } from '../../constants/tiposEvento';

export function AltaEvento({ open, onClose, nuevoEvento }) {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '', 
        fechaInicio: null, // Los pickers esperan un objeto dayjs o null
        fechaFin: null,
        descripcion: ''
    });

    // Manejador genérico para inputs de texto normales
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.fechaInicio || !formData.tipo) return;

        nuevoEvento({
            ...formData,
            // Formateamos el objeto dayjs a un string legible para guardarlo
            fechaInicio: formData.fechaInicio ? formData.fechaInicio.toDate() : null,
            fechaFin: formData.fechaFin ? formData.fechaFin.toDate() : null,
        });
        
        // Resetear formulario
        setFormData({ nombre: '', tipo: '', fechaInicio: null, fechaFin: null, descripcion: '' });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle>Registrar Nuevo Evento</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 1 }}>
                        <TextField
                            label="Nombre del Evento"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                            fullWidth
                        />
                        
                        <TextField
                            select
                            label="Tipo de Evento"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            required
                            fullWidth
                        >
                            {TIPOS_EVENTO.map((tipo) => (
                                <MenuItem key={tipo} value={tipo}>
                                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Implementación de los Pickers envueltos en su Provider */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <DateTimePicker
                                    label="Fecha y Hora de Inicio"
                                    value={formData.fechaInicio}
                                    format="DD/MM/YYYY HH:mm"
                                    onChange={(newValue) => setFormData({ ...formData, fechaInicio: newValue })}
                                    slotProps={{ textField: { fullWidth: true, required: true } }}
                                />
                                <DateTimePicker
                                    label="Fecha y Hora de Fin"
                                    value={formData.fechaFin}
                                    format="DD/MM/YYYY HH:mm"
                                    onChange={(newValue) => setFormData({ ...formData, fechaFin: newValue })}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                            </Box>
                        </LocalizationProvider>

                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar Evento</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}