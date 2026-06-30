// src/components/gestionEventos/MostrarEvento.jsx
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function MostrarEvento({ eventos, deleteEvento }) {
    
    if (eventos.length === 0) {
        return (
            <Typography variant="body1" color="textSecondary" align="center" sx={{ mt: 4 }}>
                No hay eventos registrados actualmente.
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Tipo</strong></TableCell>
                        <TableCell><strong>Fechas (Inicio - Fin)</strong></TableCell>
                        <TableCell align="center"><strong>Acciones</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {eventos.map((evento) => (
                        <TableRow key={evento.id} hover>
                            <TableCell>{evento.nombre}</TableCell>
                            <TableCell sx={{ textTransform: 'capitalize' }}>
                                {evento.tipo || 'Otro'}
                            </TableCell>
                            <TableCell>
                                {evento.fechaInicio instanceof Date 
                                    ? evento.fechaInicio.toLocaleString('es-AR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
                                    : evento.fechaInicio
                                } 
                                {evento.fechaFin ? 
                                    (
                                        ` - ${evento.fechaFin instanceof Date 
                                            ? evento.fechaFin.toLocaleString('es-AR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
                                            : evento.fechaFin}`
                                    ) : ''
                                }
                            </TableCell>
                            
                            <TableCell align="center">
                                <IconButton 
                                    color="error" 
                                    onClick={() => deleteEvento(evento.id)}
                                    title="Eliminar Evento"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}