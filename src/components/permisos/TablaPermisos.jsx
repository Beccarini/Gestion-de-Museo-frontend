import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TablaPermisos = ({ permisos, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Días Permitidos</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Franja Horaria</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {permisos.map((permiso) => (
                        <TableRow key={permiso.id} hover sx={{ '&:hover': { backgroundColor: 'action.hover' } }}>
                            <TableCell sx={{ fontWeight: 500 }}>{permiso.descripcion}</TableCell>
                            
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                    <CalendarMonthIcon sx={{ fontSize: 16, color: 'action.active', mr: 0.5 }} />
                                    {permiso.diasSemana.map((dia, idx) => (
                                        <Chip key={idx} label={dia} size="small" variant="outlined" sx={{ fontSize: '0.70rem', height: '22px' }} />
                                    ))}
                                </Box>
                            </TableCell>

                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                    <AccessTimeIcon sx={{ fontSize: 16, color: 'action.active' }} />
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                        {permiso.horaInicio} - {permiso.horaFin}
                                    </Typography>
                                </Box>
                            </TableCell>

                            <TableCell align="center">
                                <IconButton color="primary" onClick={() => onEdit(permiso)} size="small">
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton color="error" onClick={() => onDelete(permiso.id)} size="small">
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

export default TablaPermisos;