import React from 'react';
import { Box, TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export const FiltrosRegistros = ({ 
    filtroBusqueda, setFiltroBusqueda, // Para nombre/ID o texto libre
    esAsistencia, setEsAsistencia, 
    esApertura, setEsApertura, 
    onLimpiar 
}) => {
    
    const hasFilters = filtroBusqueda !== '' || esAsistencia !== '' || esApertura !== '';

    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            
            {/* Buscador de texto (puedes buscar por ID integrante o evento) */}
            <TextField
                label="Buscar por ID..."
                variant="outlined"
                size="small"
                value={filtroBusqueda}
                onChange={(e) => setFiltroBusqueda(e.target.value)}
                sx={{ minWidth: 250 }}
                InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            {/* Filtro: Asistencia */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Asistencia</InputLabel>
                <Select
                    value={esAsistencia}
                    label="Asistencia"
                    onChange={(e) => setEsAsistencia(e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                </Select>
            </FormControl>

            {/* Filtro: Apertura */}
            <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel>Apertura</InputLabel>
                <Select
                    value={esApertura}
                    label="Apertura"
                    onChange={(e) => setEsApertura(e.target.value)}
                >
                    <MenuItem value=""><em>Todos</em></MenuItem>
                    <MenuItem value="true">Sí</MenuItem>
                    <MenuItem value="false">No</MenuItem>
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

export default FiltrosRegistros;