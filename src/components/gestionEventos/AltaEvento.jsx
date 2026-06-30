// src/components/gestionEventos/AltaEvento.jsx
import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    TextField, Button, Box, MenuItem 
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs'; // Importante para la conversión en edición

import { TIPOS_EVENTO } from '../../constants/tiposEvento';

export function AltaEvento({ open, onClose, nuevoEvento, eventoAEditar }) {
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '', 
        fechaInicio: null,
        fechaFin: null,
        descripcion: ''
    });

    // Controlar si el modal se abre para Edición o para Alta
    useEffect(() => {
        if (eventoAEditar) {
            setFormData({
                nombre: eventoAEditar.nombre || '',
                tipo: eventoAEditar.tipo || '',
                // Convertimos el Date nativo de vuelta a un objeto dayjs para el componente visual
                fechaInicio: eventoAEditar.fechaInicio ? dayjs(eventoAEditar.fechaInicio) : null,
                fechaFin: eventoAEditar.fechaFin ? dayjs(eventoAEditar.fechaFin) : null,
                descripcion: eventoAEditar.descripcion || ''
            });
        } else {
            // Si viene null, se limpia para un registro nuevo limpio
            setFormData({ nombre: '', tipo: '', fechaInicio: null, fechaFin: null, descripcion: '' });
        }
    }, [eventoAEditar, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.nombre || !formData.fechaInicio || !formData.tipo) return;

        nuevoEvento({
            ...formData,
            fechaInicio: formData.fechaInicio ? formData.fechaInicio.toDate() : null,
            fechaFin: formData.fechaFin ? formData.fechaFin.toDate() : null,
        });
        
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            {/* Título dinámico adaptado a la acción */}
            <DialogTitle>{eventoAEditar ? 'Editar Evento' : 'Registrar Nuevo Evento'}</DialogTitle>
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
                    <Button type="submit" variant="contained" color="primary">
                        {eventoAEditar ? 'Guardar Cambios' : 'Guardar Evento'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}