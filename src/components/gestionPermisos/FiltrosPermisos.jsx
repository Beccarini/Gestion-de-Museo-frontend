import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const DIAS_OPCIONES = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

const FiltrosPermisos = ({ filtroDia, setFiltroDia, onLimpiar }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', alignItems: 'center' }}>
            
            <FormControl sx={{ minWidth: 250 }} size="small">
                <InputLabel id="filtro-dia-label">Filtrar por Día</InputLabel>
                <Select
                    labelId="filtro-dia-label"
                    value={filtroDia}
                    label="Filtrar por Día"
                    onChange={(e) => setFiltroDia(e.target.value)}
                >
                    <MenuItem value=""><em>Todos los días</em></MenuItem>
                    {DIAS_OPCIONES.map((dia) => (
                        <MenuItem key={dia} value={dia}>{dia}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<ClearIcon />} 
                onClick={onLimpiar}
                disabled={!filtroDia}
            >
                Limpiar Filtro
            </Button>
            
        </Box>
    );
};

export default FiltrosPermisos;