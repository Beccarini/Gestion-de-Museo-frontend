import React from 'react';
import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const CARRERAS_UTN = ["Sistemas", "Electromecánica", "Electrónica", "Química", "Industrial", "Administración Rural"];

const FiltrosIntegrantes = ({ filtroNombre, setFiltroNombre, filtroCarrera, setFiltroCarrera }) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 4, 
            backgroundColor: 'white', 
            p: 2, 
            borderRadius: 1, 
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)' 
        }}>
            <TextField
                fullWidth
                label="Buscar por Nombre..."
                variant="outlined"
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
            />
            
            <FormControl fullWidth>
                <InputLabel id="select-carrera-label">Filtrar por Carrera</InputLabel>
                <Select
                    labelId="select-carrera-label"
                    value={filtroCarrera}
                    label="Filtrar por Carrera"
                    onChange={(e) => setFiltroCarrera(e.target.value)}
                >
                    <MenuItem value=""><em>Todas las carreras</em></MenuItem>
                    {CARRERAS_UTN.map((carrera) => (
                        <MenuItem key={carrera} value={carrera}>{carrera}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Botón rápido para limpiar filtros */}
            {(filtroNombre !== '' || filtroCarrera !== '') && (
                <Button 
                    color="inherit" 
                    onClick={() => { setFiltroNombre(''); setFiltroCarrera(''); }}
                    sx={{ minWidth: '120px' }}
                >
                    Limpiar
                </Button>
            )}
        </Box>
    );
};

export default FiltrosIntegrantes;