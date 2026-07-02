import React from 'react';
import { Box, TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { CARRERAS_UTN } from '../../constants/carreras';

const FiltrosIntegrantes = ({ filtroNombre, setFiltroNombre, filtroCarrera, setFiltroCarrera, onLimpiar }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
                label="Buscar por Nombre..."
                variant="outlined"
                size="small"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                sx={{ minWidth: 250 }}
                InputProps={{
                    startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />
                }}
            />

            <FormControl size="small" sx={{ minWidth: 200 }}>
                <InputLabel id="filtro-carrera-label">Filtrar por Carrera</InputLabel>
                <Select
                    labelId="filtro-carrera-label"
                    value={filtroCarrera}
                    label="Filtrar por Carrera"
                    onChange={(e) => setFiltroCarrera(e.target.value)}
                >
                    <MenuItem value=""><em>Todas las carreras</em></MenuItem>
                    {CARRERAS_UTN.map(carrera => (
                        <MenuItem key={carrera} value={carrera}>{carrera}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button 
                variant="outlined" 
                color="primary"
                startIcon={<ClearIcon />} 
                onClick={onLimpiar}
                disabled={!filtroNombre && !filtroCarrera}
            >
                Limpiar Filtros
            </Button>
        </Box>
    );
};

export default FiltrosIntegrantes;