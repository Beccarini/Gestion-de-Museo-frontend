import React, { useState } from 'react';
import { 
    Button, 
    Checkbox, 
    FormControlLabel, 
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const estadoInicialFormulario = { 
    integranteId: null,
    eventoId: null,
    fecha: null,
    esAsistencia: false,
    esApertura: false,
    tokenLeido: 'A1B2C3D4'
};

export function AltaRegistro({ nuevoRegistro, open, onClose }) {
    const [formData, setFormData] = useState(estadoInicialFormulario);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
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
        onClose(); // Cierra el modal después de guardar
    };
    const handleClose = () => {
        setFormData(estadoInicialFormulario); // Limpia el formulario si se cancela
        onClose();
    };
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>Nuevo Registro</DialogTitle>
            <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form id="formulario-registro" onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ mt: 0.5 }}>
                            <Grid item xs={12} sm={6}>
                                <DateTimePicker
                                    label="Fecha y Hora"
                                    value={formData.fecha}
                                    onChange={handleDateChange}
                                    slotProps={{
                                        textField: { 
                                            fullWidth: true, 
                                            required: true 
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} display="flex" alignItems="center">
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
                        </Grid>
                    </form>
                </LocalizationProvider>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="error">
                    Cancelar
                </Button>
                {/* El botón está vinculado al form a través del atributo 'form' */}
                <Button type="submit" form="formulario-registro" variant="contained" color="primary">
                    Guardar Registro
                </Button>
            </DialogActions>
        </Dialog>
    );
}