// src/components/gestionEventos/MostrarEvento.jsx
import React from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, IconButton, Typography, Tooltip 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function MostrarEvento({ eventos, deleteEvento, onEditar }) {
    return (
        <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell><strong>Nombre</strong></TableCell>
                        <TableCell><strong>Tipo</strong></TableCell>
                        <TableCell><strong>Descripción</strong></TableCell>
                        <TableCell><strong>Fechas (Inicio - Fin)</strong></TableCell>
                        <TableCell align="center"><strong>Acciones</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {eventos.map((evento) => (
                        <TableRow key={evento.id} hover>
                            <TableCell style={{ fontWeight: 500 }}>{evento.nombre}</TableCell>
                            
                            <TableCell sx={{ textTransform: 'capitalize' }}>
                                {evento.tipo || 'Otro'}
                            </TableCell>
                            <TableCell>
                                {evento.descripcion}
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
                                <Tooltip title="Editar Evento">
                                    <IconButton 
                                        color="primary" 
                                        size="small" 
                                        sx={{ 
                                            mx: 0.5, 
                                            backgroundColor: '#ebf8ff', 
                                            '&:hover': { backgroundColor: '#bee3f8' } 
                                        }}
                                        onClick={() => onEditar(evento)}
                                    >
                                        <EditIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar Evento">
                                    <IconButton 
                                        color="error" 
                                        size="small"
                                        sx={{ 
                                            mx: 0.5, 
                                            backgroundColor: '#fff5f5', 
                                            '&:hover': { backgroundColor: '#fed7d7' } 
                                        }}
                                        onClick={() => deleteEvento(evento.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}