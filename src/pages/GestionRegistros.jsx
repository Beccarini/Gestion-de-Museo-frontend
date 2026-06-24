import React, { useState } from 'react';
import {Box,Button, TextField, Checkbox, FormControlLabel, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Grid} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const estadoInicialFormulario = { integranteId: '', eventoId: '', tokenLeido: '', fecha: '', esAsistencia: false, esApertura: false, mensajeError: ''};

export function GestionRegistro() {
  // Manejo manual del estado para mantener el control de los datos
    const [formData, setFormData] = useState(estadoInicialFormulario);
    const [registros, setRegistros] = useState([]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    // Alta de Registro
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría tu lógica de fetch/axios al backend. 
        // Simulamos la creación agregando un ID temporal (UUID simulado).
        const nuevoRegistro = {
            ...formData,
            id: crypto.randomUUID() 
        };
        setRegistros([...registros, nuevoRegistro]);
        setFormData(estadoInicialFormulario); // Reset manual del form
    };

    // Baja de Registro
    const handleEliminar = (id) => {
        // Aquí iría tu llamada DELETE al backend.
        setRegistros(registros.filter((registro) => registro.id !== id));
    };
    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Registros (Alta y Baja)
            </Typography>
            {/* --- SECCIÓN DE ALTA --- */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Nuevo Registro
                </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID Integrante (UUID)"
                name="integranteId"
                value={formData.integranteId}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID Evento (UUID)"
                name="eventoId"
                value={formData.eventoId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Token Leído"
                name="tokenLeido"
                value={formData.tokenLeido}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fecha"
                type="datetime-local"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensaje de Error"
                name="mensajeError"
                value={formData.mensajeError}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="esAsistencia"
                    checked={formData.esAsistencia}
                    onChange={handleChange}
                  />
                }
                label="Es Asistencia"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="esApertura"
                    checked={formData.esApertura}
                    onChange={handleChange}
                  />
                }
                label="Es Apertura"
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Guardar Registro
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* --- SECCIÓN DE BAJA (LISTADO) --- */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Integrante ID</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Asistencia</TableCell>
              <TableCell>Apertura</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
                        <TableBody>
                            {registros.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                No hay registros creados aún.
                                </TableCell>
                            </TableRow>
                            ) : (
                                registros.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{new Date(row.fecha).toLocaleString()}</TableCell>
                                            <TableCell>{row.integranteId}</TableCell>
                                            <TableCell>{row.tokenLeido}</TableCell>
                                            <TableCell>{row.esAsistencia ? 'Sí' : 'No'}</TableCell>
                                            <TableCell>{row.esApertura ? 'Sí' : 'No'}</TableCell>
                                            <TableCell align="center">
                                                <IconButton color="error" onClick={() => handleEliminar(row.id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}