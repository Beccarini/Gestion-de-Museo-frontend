import React from 'react';
import { 
    Box, 
    TextField
} from '@mui/material';

// Desestructuramos las props correctamente con { filtros, setFiltros }
export function Filtros({ filtros, setFiltros }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
            <TextField 
                label="Nombre" 
                value={filtros.nombre} 
                name="nombre" 
                onChange={handleChange} 
                fullWidth
            />
            <TextField 
                label="Categoría" 
                value={filtros.categoria} 
                name="categoria" 
                onChange={handleChange} 
                fullWidth
            />
            <TextField 
                label="Stock" 
                type="number" 
                name="stock" 
                onChange={handleChange} 
                fullWidth
            />
        </Box>
    );
}