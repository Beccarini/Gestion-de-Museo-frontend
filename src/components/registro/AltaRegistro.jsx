import React, { useState, useEffect } from 'react';
import { 
    Button, 
    Checkbox, 
    FormControlLabel, 
    Grid,
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
    eventoId:'',
    fecha: null,
    esAsistencia: false,
    esApertura: false,
    tokenLeido: 'A1B2C3D4'
};

export function AltaRegistro({ nuevoRegistro, open, onClose }) {
    const [formData, setFormData] = useState(estadoInicialFormulario);
    const [listaIntegrantes, setListaIntegrantes] = useState([]);
    const [eventos,setEventos]=useState([])
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
        getEventos().then((data)=>{
            setEventos(data || []);
        }).catch((error)=>{
            console.log(error);
        })
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
        console.log(datosParaBackend);
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
            <DialogTitle>Nuevo Registro</DialogTitle>
            <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <form id="formulario-registro" onSubmit={handleSubmit}>
                        <Grid container spacing={3} sx={{ mt: 0.5 }}>
                            <Grid xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="label-evento">Eventos</InputLabel> 
                                    <Select
                                        labelId="label-evento" // <-- Mismo ID que arriba
                                        id="eventoSeleccionado"
                                        name="eventoId"
                                        value={formData.eventoId || ''} // <-- Agrega el fallback '||' para evitar warnings de React
                                        label="Eventos" // <-- Debe ser idéntico al texto del InputLabel
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
                            </Grid>
                            <Grid xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="label-integrante">Integrante</InputLabel>
                                    <Select
                                        labelId="label-integrante"
                                        id="select-integrante"
                                        name="integranteId"
                                        value={formData.integranteId}
                                        label="Integrante"
                                        onChange={handleChange}
                                    >
                                        {listaIntegrantes.map((integrante) => (
                                            <MenuItem key={integrante.id} value={integrante.id}>
                                                {integrante.nombre} {integrante.apellido}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6}>
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
                            <Grid xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
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
                <Button type="submit" form="formulario-registro" variant="contained" color="primary">
                    Guardar Registro
                </Button>
            </DialogActions>
        </Dialog>
    );
}