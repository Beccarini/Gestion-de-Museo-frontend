import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';


const OPCIONES_ESTADO = ['pendiente', 'en curso', 'finalizado', 'archivado'];

const FormularioProyecto = ({ open, onClose, proyectoAEditar, onGuardar }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        fechaInicio: '',
        fechaFin: '',
        estado: 'pendiente' 
    });

    useEffect(() => {
        if (proyectoAEditar) {
            setFormData({
                nombre: proyectoAEditar.nombre || '',
                descripcion: proyectoAEditar.descripcion || '',
                fechaInicio: proyectoAEditar.fechaInicio ? proyectoAEditar.fechaInicio.split('T')[0] : '',
                fechaFin: proyectoAEditar.fechaFin ? proyectoAEditar.fechaFin.split('T')[0] : '',
                estado: proyectoAEditar.estado || 'pendiente' // Fallback a 'pendiente'
            });
        } else {
            setFormData({ nombre: '', descripcion: '', fechaInicio: '', fechaFin: '', estado: 'pendiente' });
        }
    }, [proyectoAEditar, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const dataAEnviar = {
            ...formData,
            fechaInicio: formData.fechaInicio === '' ? null : formData.fechaInicio,
            fechaFin: formData.fechaFin === '' ? null : formData.fechaFin,
        };

        onGuardar(dataAEnviar);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
            <DialogTitle fontWeight="bold">
                {proyectoAEditar ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent dividers>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        
                        <TextField
                            label="Nombre del Proyecto"
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

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField
                                label="Fecha de Inicio"
                                name="fechaInicio"
                                type="date"
                                value={formData.fechaInicio || ''} 
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ 
                                    shrink: true 
                                }}
                                slotProps={{ 
                                    inputLabel: { shrink: true } 
                                }}
                            />
                            <TextField
                                label="Fecha de Fin"
                                name="fechaFin"
                                type="date"
                                value={formData.fechaFin || ''} 
                                onChange={handleChange}
                                fullWidth
                                InputLabelProps={{ 
                                    shrink: true 
                                }}
                                slotProps={{ 
                                    inputLabel: { shrink: true }
                                }}
                            />
                        </Box>

                        <FormControl fullWidth required>
                            <InputLabel id="estado-label">Estado</InputLabel>
                            <Select
                                labelId="estado-label"
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                label="Estado"
                            >
                                {OPCIONES_ESTADO.map((estado) => (
                                    <MenuItem key={estado} value={estado}>
                                        {estado}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={onClose} color="inherit">Cancelar</Button>
                    <Button type="submit" variant="contained" color="primary">Guardar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default FormularioProyecto;