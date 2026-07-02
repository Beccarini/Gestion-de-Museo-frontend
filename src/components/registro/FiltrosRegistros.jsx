import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Opcional: para que el calendario esté en español

export const FiltrosRegistros = ({ 
    fechaInicio, setFechaInicio, 
    fechaFin, setFechaFin, 
    esAsistencia, setEsAsistencia, 
    esApertura, setEsApertura 
}) => {
    
    const hasFilters = fechaInicio || fechaFin || esAsistencia !== '' || esApertura !== '';

    const limpiarFiltros = () => {
        setFechaInicio('');
        setFechaFin('');
        setEsAsistencia('');
        setEsApertura('');
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
            <Box sx={{ 
                display: 'flex', 
                gap: 2, 
                mb: 4, 
                backgroundColor: 'white', 
                p: 2, 
                borderRadius: 1, 
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
                flexWrap: 'wrap',
                alignItems: 'center' // Para que los inputs queden bien alineados
            }}>
                
                {/* Selector de Fecha y Hora de Inicio */}
                <DateTimePicker
                    label="Fecha y Hora Inicio"
                    value={fechaInicio ? dayjs(fechaInicio) : null}
                    onChange={(newValue) => setFechaInicio(newValue ? newValue.toISOString() : '')}
                    slotProps={{ textField: { variant: 'outlined', sx: { flexGrow: 1, minWidth: '220px' } } }}
                />

                {/* Selector de Fecha y Hora de Fin */}
                <DateTimePicker
                    label="Fecha y Hora Fin"
                    value={fechaFin ? dayjs(fechaFin) : null}
                    onChange={(newValue) => setFechaFin(newValue ? newValue.toISOString() : '')}
                    slotProps={{ textField: { variant: 'outlined', sx: { flexGrow: 1, minWidth: '220px' } } }}
                />
                
                <FormControl sx={{ flexGrow: 1, minWidth: '150px' }}>
                    <InputLabel id="select-asistencia-label">Asistencia</InputLabel>
                    <Select
                        labelId="select-asistencia-label"
                        value={esAsistencia}
                        label="Asistencia"
                        onChange={(e) => setEsAsistencia(e.target.value)}
                    >
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        <MenuItem value="true">Sí</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ flexGrow: 1, minWidth: '150px' }}>
                    <InputLabel id="select-apertura-label">Apertura</InputLabel>
                    <Select
                        labelId="select-apertura-label"
                        value={esApertura}
                        label="Apertura"
                        onChange={(e) => setEsApertura(e.target.value)}
                    >
                        <MenuItem value=""><em>Todos</em></MenuItem>
                        <MenuItem value="true">Sí</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                    </Select>
                </FormControl>

                {hasFilters && (
                    <Button color="inherit" onClick={limpiarFiltros} sx={{ minWidth: '120px' }}>
                        Limpiar
                    </Button>
                )}
            </Box>
        </LocalizationProvider>
    );
};