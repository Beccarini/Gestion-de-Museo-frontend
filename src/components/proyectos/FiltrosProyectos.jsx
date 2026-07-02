
import React from 'react';
import { Box, TextField, MenuItem, Button, FormControl, InputLabel, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';


const OPCIONES_ESTADO = ['pendiente', 'en curso', 'finalizado', 'archivado'];

const FiltrosProyectos = ({ filtroNombre, setFiltroNombre, filtroEstado, setFiltroEstado, onLimpiar }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
                label="Buscar por nombre"
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
                <InputLabel id="filtro-estado-label">Filtrar por Estado</InputLabel>
                <Select
                    labelId="filtro-estado-label"
                    value={filtroEstado}
                    label="Filtrar por Estado"
                    onChange={(e) => setFiltroEstado(e.target.value)}
                >
                    <MenuItem value=""><em>Todos los estados</em></MenuItem>
                    {OPCIONES_ESTADO.map(estado => (
                        <MenuItem key={estado} value={estado}>{estado}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<ClearIcon />} 
                onClick={onLimpiar}
                disabled={!filtroNombre && !filtroEstado}
            >
                Limpiar Filtros
            </Button>
        </Box>
    );
};

export default FiltrosProyectos;