import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Checkbox, 
    FormControlLabel, 
    Box, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { getIntegrantes } from '../../services/integranteService';
import { getEventos } from '../../services/eventoService';

const estadoInicialFormulario = { 
    integranteId: '',
    eventoId: '',
    fecha: null,
    esAsistencia: false,
    esApertura: false,
    tokenLeido: 'A1B2C3D4'
};

export function AltaRegistro({ nuevoRegistro, open, onClose }) {
    const [formData, setFormData] = useState(estadoInicialFormulario);
    const [listaIntegrantes, setListaIntegrantes] = useState([]);
    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        if (open) {
            obtenerIntegrantes();
        }
    }, [open]);

    const obtenerIntegrantes = () => {
        getIntegrantes().then((data) => {
            setListaIntegrantes(data.integrantes || []);
        }).catch((error) => {
            console.log(error);
        });
        
        getEventos().then((data) => {
            setEventos(data || []);
        }).catch((error) => {
            console.log(error);
        });
    };

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
            integranteId: formData.integranteId === '' ? null : formData.integranteId,
            fecha: formData.fecha.toISOString() 
        };
        nuevoRegistro(datosParaBackend);
        setFormData(estadoInicialFormulario);
        onClose();
    };

    const handleClose = () => {
        setFormData(estadoInicialFormulario); 
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Nuevo Registro</DialogTitle>
            <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form id="formulario-registro" onSubmit={handleSubmit}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                            
                            <FormControl fullWidth>
                                <InputLabel id="label-evento">Evento *</InputLabel> 
                                <Select
                                    labelId="label-evento"
                                    id="eventoSeleccionado"
                                    name="eventoId"
                                    value={formData.eventoId} 
                                    label="Evento *"
                                    onChange={handleChange}
                                >
                                    {eventos.length === 0 ? (
                                        <MenuItem disabled value=""><em>No hay eventos disponibles</em></MenuItem>
                                    ) : (
                                        eventos.map((evento) => (
                                            <MenuItem key={evento.id} value={evento.id}>
                                                {evento.nombre}
                                            </MenuItem>
                                        ))
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel id="label-integrante">Integrante *</InputLabel>
                                <Select
                                    labelId="label-integrante"
                                    id="select-integrante"
                                    name="integranteId"
                                    value={formData.integranteId}
                                    label="Integrante *"
                                    onChange={handleChange}
                                >
                                    {listaIntegrantes.map((integrante) => (
                                        <MenuItem key={integrante.id} value={integrante.id}>
                                            {integrante.nombre} {integrante.apellido}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <DateTimePicker
                                        label="Fecha y Hora *"
                                        value={formData.fecha}
                                        onChange={handleDateChange}
                                        slotProps={{
                                            textField: { 
                                                fullWidth: true, 
                                                required: true,
                                            }
                                        }}
                                    />
                                </Box>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="esAsistencia"
                                            checked={formData.esAsistencia}
                                            onChange={handleChange}
                                            color="primary"
                                        />
                                    }
                                    label="Es Asistencia"
                                    sx={{ minWidth: '150px' }}
                                />
                            </Box>
                            
                        </Box>
                    </form>
                </LocalizationProvider>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} color="error" variant="text">
                    CANCELAR
                </Button>
                <Button type="submit" form="formulario-registro" variant="contained" color="primary">
                    GUARDAR REGISTRO
                </Button>
            </DialogActions>
        </Dialog>
    );
}