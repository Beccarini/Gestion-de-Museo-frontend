import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const FormularioIntegrante = ({ open, onClose, onGuardar, integrante }) => {
    const [formData, setFormData] = useState({ nombre: '', legajo: '', token: '', carrera: '' });

    useEffect(() => {
        if (integrante) {
            setFormData({
                nombre: integrante.nombre || '',
                legajo: integrante.legajo || '',
                token: integrante.token || '',
                carrera: integrante.carrera || ''
            });
        } else {
            setFormData({ nombre: '', legajo: '', token: '', carrera: '' });
        }
    }, [integrante, open]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        onGuardar(formData);
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
            <DialogTitle>{integrante ? 'Editar Integrante' : 'Nuevo Integrante'}</DialogTitle>
            <DialogContent>
                <TextField 
                    name="nombre"
                    label="Nombre"
                    fullWidth 
                    margin="dense" 
                    value={formData.nombre} 
                    onChange={handleChange} 
                />
                <TextField 
                    name="legajo"
                    label="Legajo"
                    fullWidth 
                    margin="dense" 
                    value={formData.legajo}
                    onChange={handleChange} 
                />
                <TextField 
                    name="token"
                    label="Token"
                    fullWidth 
                    margin="dense" 
                    value={formData.token}
                    onChange={handleChange} 
                />
                <TextField 
                    name="carrera"
                    label="Carrera"
                    fullWidth 
                    margin="dense" 
                    value={formData.carrera}
                    onChange={handleChange} 
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormularioIntegrante;