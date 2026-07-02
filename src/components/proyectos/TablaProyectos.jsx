import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '-';
    return new Date(fechaISO).toLocaleDateString('es-ES');
};

const getEstadoColor = (estado) => {
    switch (estado?.toLowerCase()) {
        case 'pendiente': return 'warning';
        case 'en curso': return 'info';
        case 'finalizado': return 'success';
        case 'archivado': return 'default';
        default: return 'default';
    }
};

const TablaProyectos = ({ proyectos, onEdit, onDelete, onVerIntegrantes, onAsignarIntegrantes }) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Fecha Inicio</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Fecha Fin</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {proyectos.map((proyecto) => (
                        <TableRow key={proyecto.id} hover sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                            <TableCell sx={{ fontWeight: 500 }}>{proyecto.nombre}</TableCell>
                            
                            <TableCell>
                                <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>
                                    {proyecto.descripcion || '-'}
                                </Typography>
                            </TableCell>

                            <TableCell>{formatearFecha(proyecto.fechaInicio)}</TableCell>
                            <TableCell>{formatearFecha(proyecto.fechaFin)}</TableCell>

                            <TableCell>
                                <Chip 
                                    label={proyecto.estado} 
                                    color={getEstadoColor(proyecto.estado)}
                                    size="small" 
                                    variant="outlined" 
                                />
                            </TableCell>

                            <TableCell align="center">
                                <Tooltip title="Ver estudiantes asignados">
                                    <IconButton color="info" onClick={() => onVerIntegrantes(proyecto)} size="small">
                                        <PeopleIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Asignar estudiantes">
                                    <IconButton color="secondary" onClick={() => onAsignarIntegrantes(proyecto)} size="small">
                                        <GroupAddIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <IconButton color="primary" onClick={() => onEdit(proyecto)} size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton color="error" onClick={() => onDelete(proyecto.id)} size="small">
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TablaProyectos;