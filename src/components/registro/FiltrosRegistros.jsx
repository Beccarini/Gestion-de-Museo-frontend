import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

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
        <Box sx={{ display: 'flex', gap: 2, mb: 4, backgroundColor: 'white', p: 2, borderRadius: 1, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', flexWrap: 'wrap' }}>
            
            {/* INPUT FECHA INICIO */}
            <TextField
                label="Fecha Inicio"
                type="date"
                variant="outlined"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                InputLabelProps={{ shrink: true }} /* <--- ESTO ARREGLA EL PROBLEMA VISUAL */
                sx={{ flexGrow: 1, minWidth: '150px' }}
            />

            {/* INPUT FECHA FIN */}
            <TextField
                label="Fecha Fin"
                type="date"
                variant="outlined"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                InputLabelProps={{ shrink: true }} /* <--- ESTO ARREGLA EL PROBLEMA VISUAL */
                sx={{ flexGrow: 1, minWidth: '150px' }}
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
    );
};