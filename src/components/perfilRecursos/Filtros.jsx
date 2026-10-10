import React from 'react';
import { 
    Box, 
    TextField, 
    Button 
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export function Filtros({ filtros, setFiltros }) {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const onLimpiar = () => {
        setFiltros({
            nombre: '',
            categoria: '',
            stock: ''
        });
    };
    const hasFilters = Boolean(filtros.nombre || filtros.categoria || filtros.stock);
    return (
        <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            mb: 3, 
            flexWrap: 'wrap', 
            alignItems: 'center',
            mt: 1 
        }}>
            <TextField 
                label="Nombre" 
                value={filtros.nombre} 
                name="nombre" 
                onChange={handleChange} 
                size="small"
                sx={{ minWidth: 180 }}
            />
            
            <TextField 
                label="Categoría" 
                value={filtros.categoria} 
                name="categoria" 
                onChange={handleChange} 
                size="small"
                sx={{ minWidth: 180 }}
            />
            
            <TextField 
                label="Stock" 
                type="number" 
                value={filtros.stock !== null ? filtros.stock : ''} 
                name="stock" 
                onChange={handleChange} 
                size="small"
                sx={{ minWidth: 140 }}
            />

            <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<ClearIcon />} 
                onClick={onLimpiar}
                disabled={!hasFilters}
                size="medium"
            >
                Limpiar Filtros
            </Button>
        </Box>
    );
}