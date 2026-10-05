import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Box, 
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from '@mui/material';

const estadoInicialFormulario = { 
    nombre: '',
    descripcion: '',
    categoria: '',
    stock: 0
};

export function AltaModificacionRecursos({ nuevoRecurso, open, onClose, recursoAEditar, setRecursoAEditar}) {
    const [formData, setFormData] = useState(estadoInicialFormulario);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    useEffect(()=>{
        if(recursoAEditar){
            setFormData((prev)=>({
                ...prev,
                nombre: recursoAEditar.nombre
            }));
            setFormData((prev)=>({
                ...prev,
                descripcion: recursoAEditar.descripcion
            }));
            setFormData((prev)=>({
                ...prev,
                categoria: recursoAEditar.categoria
            }));
            setFormData((prev)=>({
                ...prev,
                stock: recursoAEditar.stock
            }));
        }
    }, [recursoAEditar])
    const handleSubmit = (e) => {
        e.preventDefault();
        const datosParaBackend = {
            ...formData,
            stock: parseInt(formData.stock, 10) 
        };
        nuevoRecurso(datosParaBackend);
        setFormData(estadoInicialFormulario);
        onClose();
    };
    const handleClose = () => {
        setFormData(estadoInicialFormulario);
        setRecursoAEditar();
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ fontWeight: 'bold' }}>Nuevo Recurso</DialogTitle>
            <DialogContent dividers>
                <form id="formulario-recurso" onSubmit={handleSubmit}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 1 }}>
                        
                        <TextField
                            label="Nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Descripción"
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={3}
                        />

                        <TextField
                            label="Categoría"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            fullWidth
                        />

                        <TextField
                            label="Stock"
                            name="stock"
                            type="number"
                            value={formData.stock}
                            onChange={handleChange}
                            fullWidth
                            required
                            inputProps={{ min: 0 }}
                        />

                    </Box>
                </form>
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleClose} color="error" variant="text">
                    CANCELAR
                </Button>
                <Button type="submit" form="formulario-recurso" variant="contained" color="primary">
                    GUARDAR RECURSO
                </Button>
            </DialogActions>
        </Dialog>
    );
}