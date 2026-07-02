import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export const FiltrosPlantillas = ({ 
    tipo, setTipo, 
    diaSemana, setDiaSemana, 
    frecuencia, setFrecuencia,
    activo, setActivo,
    onLimpiar 
}) => {
    
    const hasFilters = tipo !== '' || diaSemana !== '' || frecuencia !== '' || activo !== '';

    const dias = [
        { value: '0', label: 'Domingo' },
        { value: '1', label: 'Lunes' },
        { value: '2', label: 'Martes' },
        { value: '3', label: 'Miércoles' },
        { value: '4', label: 'Jueves' },
        { value: '5', label: 'Viernes' },
        { value: '6', label: 'Sábado' }
    ];

    const tipos = ['clase', 'reunion', 'visita', 'mantenimiento', 'otro'];
    const frecuencias = ['semanal', 'quincenal', 'mensual'];

    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            flexWrap: 'wrap', 
            alignItems: 'center' 
        }}>
            <FormControl sx={{ minWidth: 160 }} size="small">
                <InputLabel id="select-tipo-label">Tipo</InputLabel>
                <Select
                    labelId="select-tipo-label"
                    value={tipo}
                    label="Tipo"
                    onChange={(e) => setTipo(e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    {tipos.map(t => (
                        <MenuItem key={t} value={t}>
                            {t.charAt(0).toUpperCase() + t.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160 }} size="small">
                <InputLabel id="select-dia-label">Día</InputLabel>
                <Select
                    labelId="select-dia-label"
                    value={diaSemana}
                    label="Día"
                    onChange={(e) => setDiaSemana(e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    {dias.map(dia => (
                        <MenuItem key={dia.value} value={dia.value}>{dia.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160 }} size="small">
                <InputLabel id="select-frecuencia-label">Frecuencia</InputLabel>
                <Select
                    labelId="select-frecuencia-label"
                    value={frecuencia}
                    label="Frecuencia"
                    onChange={(e) => setFrecuencia(e.target.value)}
                >
                    <MenuItem value=""><em>Todas</em></MenuItem>
                    {frecuencias.map(f => (
                        <MenuItem key={f} value={f}>
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 160 }} size="small">
                <InputLabel id="select-estado-label">Estado</InputLabel>
                <Select
                    labelId="select-estado-label"
                    value={activo}
                    label="Estado"
                    onChange={(e) => setActivo(e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    <MenuItem value="true">Activos</MenuItem>
                    <MenuItem value="false">Inactivos</MenuItem>
                </Select>
            </FormControl>

            <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<ClearIcon />} 
                onClick={onLimpiar}
                disabled={!hasFilters}
            >
                Limpiar Filtros
            </Button>
        </Box>
    );
};

export default FiltrosPlantillas;