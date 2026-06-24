import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Typography, Paper, Grid } from '@mui/material';

const estadoInicialFormulario = { 
    integranteId: '', 
    eventoId: '', 
    tokenLeido: '', 
    fecha: '', 
    esAsistencia: false, 
    esApertura: false, 
    mensajeError: ''
};

// CORRECCIÓN AQUÍ: Se agregan las llaves { } para desestructurar las props
export function AltaRegistro({ registros, setRegistros }) {
    const [formData, setFormData] = useState(estadoInicialFormulario);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const nuevoRegistro = {
            ...formData,
            id: crypto.randomUUID() 
        };
        
        setRegistros([...registros, nuevoRegistro]);
        setFormData(estadoInicialFormulario);
    };

    return (
        <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
                Nuevo Registro
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ID Integrante (UUID)"
                            name="integranteId"
                            value={formData.integranteId}
                            onChange={handleChange}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="ID Evento (UUID)"
                            name="eventoId"
                            value={formData.eventoId}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Token Leído"
                            name="tokenLeido"
                            value={formData.tokenLeido}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Fecha"
                            type="datetime-local"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Mensaje de Error"
                            name="mensajeError"
                            value={formData.mensajeError}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                            <Checkbox
                                name="esApertura"
                                checked={formData.esApertura}
                                onChange={handleChange}
                            />
                            }
                            label="Es Apertura"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Guardar Registro
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}