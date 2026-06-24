import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AltaRegistro } from './AltaRegistro'; // Asegúrate de que la ruta sea correcta

export function GestionRegistro() {
    const [registros, setRegistros] = useState([]);

    const handleEliminar = (id) => {
        setRegistros(registros.filter((registro) => registro.id !== id));
    };

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Registros (Alta y Baja)
            </Typography>
            
            {/* --- SECCIÓN DE ALTA --- */}
            <AltaRegistro registros={registros} setRegistros={setRegistros}/>
            
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
                        {registros.length === 0 ? 
                            (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">
                                        No hay registros creados aún.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                registros.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.fecha ? new Date(row.fecha).toLocaleString() : ''}</TableCell>
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
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}