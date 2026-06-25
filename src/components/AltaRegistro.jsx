import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Paper, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const estadoInicialFormulario = { 
    integranteId: null,
    eventoId:null,
    fecha: null,
    esAsistencia: false,
    esApertura: false,
    tokenLeido: 'A1B2C3D4'
};

export function AltaRegistro({nuevoRegistro}) {
    const [formData, setFormData] = useState(estadoInicialFormulario);

    // Manejador para inputs nativos (texto, checkbox)
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // CORRECCIÓN: Manejador específico para el DateTimePicker
    const handleDateChange = (nuevaFecha) => {
        setFormData((prev) => ({
            ...prev,
            fecha: nuevaFecha
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.fecha) {
            console.error("La fecha es obligatoria");
            return;
        }
        const datosParaBackend = {
            ...formData,
            fecha: formData.fecha.toISOString() 
        };
        nuevoRegistro(datosParaBackend);
        setFormData(estadoInicialFormulario);
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Nuevo Registro
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid xs={12} sm={6}>
                            <DateTimePicker
                                label="Fecha y Hora"
                                value={formData.fecha}
                                onChange={handleDateChange} // CORRECCIÓN: Usa la función específica
                                slotProps={{
                                    textField: { 
                                        fullWidth: true, 
                                        required: true 
                                    }
                                }}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    name="esAsistencia"
                                    checked={formData.esAsistencia}
                                    onChange={handleChange}
                                />
                                }
                                label="Es Asistencia"
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Button type="submit" variant="contained" color="primary">
                                Guardar Registro
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </LocalizationProvider>
    );
}