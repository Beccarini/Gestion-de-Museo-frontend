import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tooltip from '@mui/material/Tooltip';
import PeopleIcon from '@mui/icons-material/People';

const TablaPermisos = ({ permisos, onEdit, onDelete, onAsignarMasivo, onVerIntegrantes }) => {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Días Permitidos</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Franja Horaria</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {permisos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No hay permisos creados aún.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        permisos.map((permiso) => (
                            <TableRow 
                                key={permiso.id} 
                                hover 
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#fafafa' } 
                                }}
                            >
                                <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                    {permiso.descripcion}
                                </TableCell>
                                
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                        <CalendarMonthIcon sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
                                        {permiso.diasSemana.map((dia, idx) => (
                                            <Chip 
                                                key={idx} 
                                                label={dia} 
                                                size="small" 
                                                variant="outlined" 
                                                sx={{ fontWeight: 600, fontSize: '0.70rem', height: '22px' }} 
                                            />
                                        ))}
                                    </Box>
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                                            {permiso.horaInicio} - {permiso.horaFin}
                                        </Typography>
                                    </Box>
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="Ver integrantes asignados">
                                        <IconButton color="info" onClick={() => onVerIntegrantes(permiso)} size="small">
                                            <PeopleIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Asignar a integrantes">
                                        <IconButton color="secondary" onClick={() => onAsignarMasivo(permiso)} size="small">
                                            <GroupAddIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar permiso">
                                        <IconButton color="primary" onClick={() => onEdit(permiso)} size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar permiso">
                                        <IconButton color="error" onClick={() => onDelete(permiso.id)} size="small">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TablaPermisos;