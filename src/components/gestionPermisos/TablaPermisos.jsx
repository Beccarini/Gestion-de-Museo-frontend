import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import Tooltip from '@mui/material/Tooltip';
import PeopleIcon from '@mui/icons-material/People';
// 1. Importamos el ícono para ir al perfil
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// 2. Agregamos onVerPermiso a las props
const TablaPermisos = ({ permisos, onEdit, onDelete, onAsignarMasivo, onVerIntegrantes, onVerPermiso }) => {
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
                                // 3. Hacemos la fila clickeable
                                onClick={() => onVerPermiso && onVerPermiso(permiso.id)}
                                sx={{ 
                                    cursor: 'pointer',
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)' } 
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
                                    {/* Botón explícito para ir al perfil */}
                                    <Tooltip title="Ver perfil del permiso">
                                        <IconButton 
                                            color="success" 
                                            onClick={(e) => { e.stopPropagation(); onVerPermiso(permiso.id); }} 
                                            size="small"
                                        >
                                            <OpenInNewIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    
                                    {/* 4. A TODOS los demás botones les agregamos e.stopPropagation() */}
                                    <Tooltip title="Ver integrantes asignados">
                                        <IconButton 
                                            color="info" 
                                            onClick={(e) => { e.stopPropagation(); onVerIntegrantes(permiso); }} 
                                            size="small"
                                        >
                                            <PeopleIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Asignar a integrantes">
                                        <IconButton 
                                            color="secondary" 
                                            onClick={(e) => { e.stopPropagation(); onAsignarMasivo(permiso); }} 
                                            size="small"
                                        >
                                            <GroupAddIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Editar permiso">
                                        <IconButton 
                                            color="primary" 
                                            onClick={(e) => { e.stopPropagation(); onEdit(permiso); }} 
                                            size="small"
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar permiso">
                                        <IconButton 
                                            color="error" 
                                            onClick={(e) => { e.stopPropagation(); onDelete(permiso.id); }} 
                                            size="small"
                                        >
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