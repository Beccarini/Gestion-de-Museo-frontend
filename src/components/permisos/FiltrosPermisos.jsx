import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';

const DIAS_OPCIONES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const FiltrosPermisos = ({ filtroDia, setFiltroDia, onLimpiar }) => {
    return (
        <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center', backgroundColor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 1 }}>
            <FilterListIcon color="action" />
            
            <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel id="filtro-dia-label">Filtrar por Día</InputLabel>
                <Select
                    labelId="filtro-dia-label"
                    value={filtroDia}
                    label="Filtrar por Día"
                    onChange={(e) => setFiltroDia(e.target.value)}
                >
                    {DIAS_OPCIONES.map((dia) => (
                        <MenuItem key={dia} value={dia}>{dia}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Botón para limpiar el filtro que solo aparece si hay un filtro activo */}
            {filtroDia && (
                <Tooltip title="Limpiar filtro">
                    <IconButton onClick={onLimpiar} color="error">
                        <ClearIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default FiltrosPermisos;