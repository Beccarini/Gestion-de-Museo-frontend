import React, { useState, useEffect } from 'react';
import { 
    Dialog, DialogTitle, DialogContent, DialogActions, 
    Button, TextField, FormControl, InputLabel, Select, MenuItem 
} from '@mui/material';

import { CARRERAS_UTN } from '../../constants/carreras';

const FormularioIntegrante = ({ open, onClose, onGuardar, integrante }) => {
    const [formData, setFormData] = useState({ nombre: '', legajo: '', token: '', carrera: '' });
    
    const [errores, setErrores] = useState({});

    useEffect(() => {
        setErrores({});
        
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
        
        if (errores[e.target.name]) {
            setErrores({ ...errores, [e.target.name]: '' });
        }
    };

    const validar = () => {
        let tempErrores = {};
        
        if (!formData.nombre.trim()) {
            tempErrores.nombre = "El nombre no puede estar vacío.";
        }
        
        if (!formData.legajo.toString().trim()) {
            tempErrores.legajo = "El legajo no puede estar vacío.";
        } else if (!/^\d+$/.test(formData.legajo)) {
            tempErrores.legajo = "El legajo debe contener solo números.";
        }

        setErrores(tempErrores);
                return Object.keys(tempErrores).length === 0;
    };

    const handleSubmit = () => {
        if (validar()) {
            onGuardar(formData);
        }
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
                    error={!!errores.nombre}
                    helperText={errores.nombre}
                />
                <TextField 
                    name="legajo"
                    label="Legajo"
                    fullWidth 
                    margin="dense" 
                    value={formData.legajo}
                    onChange={handleChange}
                    error={!!errores.legajo}
                    helperText={errores.legajo}
                />
                <TextField 
                    name="token"
                    label="Token"
                    fullWidth 
                    margin="dense" 
                    value={formData.token}
                    onChange={handleChange} 
                />
                
                <FormControl fullWidth margin="dense">
                    <InputLabel id="carrera-label">Carrera</InputLabel>
                    <Select
                        labelId="carrera-label"
                        name="carrera"
                        value={formData.carrera}
                        label="Carrera"
                        onChange={handleChange}
                    >
                        <MenuItem value=""><em>Seleccionar...</em></MenuItem>
                        {CARRERAS_UTN.map((carrera) => (
                            <MenuItem key={carrera} value={carrera}>{carrera}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit}>Guardar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default FormularioIntegrante;