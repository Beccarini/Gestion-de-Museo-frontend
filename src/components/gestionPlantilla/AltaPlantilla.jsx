import React, { useState, useEffect } from 'react';
import { 
    Button, Checkbox, FormControlLabel, Grid, Dialog, DialogTitle, 
    DialogContent, DialogActions, FormControl, InputLabel, Select, 
    MenuItem, TextField, Box
} from '@mui/material';
import { TIPOS_EVENTO } from '../../constants/tiposEvento';
import { DIAS_SEMANA } from '../../constants/diasSemana';
import { FRECUENCIAS } from '../../constants/frecuencia';

const estadoInicialFormulario = { 
    nombre: '',
    descripcion: '',
    tipo: 'clase',
    diaSemana: 1,
    frecuencia: 'semanal',
    horaInicio: '08:00',
    horaFin: '10:00',
    activo: true
};

export function AltaPlantilla({ guardarPlantilla, open, onClose, plantillaEdit }) {
    const [formData, setFormData] = useState(estadoInicialFormulario);

    useEffect(() => {
        if (open) {
            if (plantillaEdit) {
                setFormData({
                    ...estadoInicialFormulario,
                    ...plantillaEdit,
                    descripcion: plantillaEdit.descripcion || ''
                });
            } else {
                setFormData(estadoInicialFormulario);
            }
        }
    }, [open, plantillaEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isEdit = Boolean(plantillaEdit);
        const id = isEdit ? plantillaEdit.id : null;
        guardarPlantilla(formData, isEdit, id);
        handleClose();
    };

    const handleClose = () => {
        setFormData(estadoInicialFormulario); 
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>
                {plantillaEdit ? 'Editar Plantilla' : 'Nueva Plantilla'}
            </DialogTitle>
            
            <DialogContent dividers>
                <form id="formulario-plantilla" onSubmit={handleSubmit}>
                    <Grid container spacing={3} sx={{ mt: 0.5, mb: 1 }}>
                        
                        <Grid item xs={12}>
                            <TextField
                                label="Nombre de la Plantilla"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Tipo</InputLabel>
                                <Select
                                    name="tipo"
                                    value={formData.tipo}
                                    label="Tipo"
                                    onChange={handleChange}
                                >
                                    {TIPOS_EVENTO.map((t) => (
                                        <MenuItem key={t} value={t}>{t.toUpperCase()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel>Frecuencia</InputLabel>
                                <Select
                                    name="frecuencia"
                                    value={formData.frecuencia}
                                    label="Frecuencia"
                                    onChange={handleChange}
                                >
                                    {FRECUENCIAS.map((frec) => (
                                        <MenuItem key={frec} value={frec}>{frec.toUpperCase()}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Día de la Semana</InputLabel>
                                <Select
                                    name="diaSemana"
                                    value={formData.diaSemana}
                                    label="Día de la Semana"
                                    onChange={handleChange}
                                >
                                    {DIAS_SEMANA.map((dia, index) => (
                                        <MenuItem key={index} value={index}>{dia}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Hora Inicio"
                                type="time"
                                name="horaInicio"
                                value={formData.horaInicio}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Hora Fin"
                                type="time"
                                name="horaFin"
                                value={formData.horaFin}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', p: 1.5, borderRadius: 2 }}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="activo"
                                            checked={formData.activo}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="Plantilla Activa"
                                    sx={{ m: 0 }}
                                />
                            </Box>
                        </Grid>

                    </Grid>
                </form>
            </DialogContent>
            
            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} color="error" variant="text">
                    CANCELAR
                </Button>
                <Button type="submit" form="formulario-plantilla" variant="contained" color="primary">
                    {plantillaEdit ? 'ACTUALIZAR PLANTILLA' : 'GUARDAR PLANTILLA'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}