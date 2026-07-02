import React, { useState } from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, IconButton, Chip, Typography, Box,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, Tooltip 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import GroupAddIcon from '@mui/icons-material/GroupAdd';


const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '—';
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
    const [modalDesc, setModalDesc] = useState({ open: false, titulo: '', texto: '' });

    const handleAbrirDescripcion = (nombre, descripcion) => {
        setModalDesc({ open: true, titulo: nombre, texto: descripcion });
    };

    const handleCerrarDescripcion = () => {
        setModalDesc({ open: false, titulo: '', texto: '' });
    };

    return (
        <>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Descripción</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Fecha Inicio</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Fecha Fin</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Estado</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {proyectos.map((proyecto) => (
                            <TableRow 
                                key={proyecto.id} 
                                hover 
                                sx={{ '&:hover': { backgroundColor: '#fafafa' }, '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                    {proyecto.nombre}
                                </TableCell>
                                <TableCell>
                                    {proyecto.descripcion ? (
                                        <Tooltip title={proyecto.descripcion} arrow placement="top">
                                            <Typography 
                                                variant="body2" 
                                                color="text.secondary" 
                                                noWrap 
                                                sx={{ 
                                                    maxWidth: 180, 
                                                    cursor: 'default'
                                                }}
                                            >
                                                {proyecto.descripcion}
                                            </Typography>
                                        </Tooltip>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">
                                            —
                                        </Typography>
                                    )}
                                </TableCell>

                                <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{formatearFecha(proyecto.fechaInicio)}</TableCell>
                                <TableCell sx={{ color: 'text.secondary', fontWeight: 500 }}>{formatearFecha(proyecto.fechaFin)}</TableCell>

                                <TableCell>
                                    <Chip 
                                        label={proyecto.estado} 
                                        color={getEstadoColor(proyecto.estado)}
                                        size="small" 
                                        variant="outlined" 
                                        sx={{ fontWeight: 700, borderWidth: '1.5px', textTransform: 'capitalize' }}
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
                                    <Tooltip title="Editar proyecto">
                                        <IconButton color="primary" onClick={() => onEdit(proyecto)} size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar proyecto">
                                        <IconButton color="error" onClick={() => onDelete(proyecto.id)} size="small">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default TablaProyectos;