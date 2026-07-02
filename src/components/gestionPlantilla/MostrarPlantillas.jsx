import React from 'react';
import { 
    Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, IconButton, Chip, Box, Typography, Tooltip, Switch 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DIAS_SEMANA } from '../../constants/diasSemana';

export function MostrarPlantillas({ plantillas, deletePlantilla, toggleEstado, editarPlantilla }) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Frecuencia</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Día</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Horario</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {plantillas.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No hay plantillas creadas aún.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        plantillas.map((row) => (
                            <TableRow 
                                key={row.id}
                                hover
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#fafafa' } 
                                }}
                            >
                                <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                    {row.nombre}
                                </TableCell>
                                
                                <TableCell sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                                    {row.tipo || 'Otro'}
                                </TableCell>
                                
                                <TableCell sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                                    {row.frecuencia || '—'}
                                </TableCell>

                                <TableCell sx={{ color: 'text.secondary' }}>
                                    {DIAS_SEMANA[row.diaSemana]}
                                </TableCell>
                                
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                                            {row.horaInicio} - {row.horaFin}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                
                                <TableCell>
                                    <Chip 
                                        label={row.activo ? "Activo" : "Inactivo"} 
                                        color={row.activo ? "success" : "default"} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ fontWeight: 700, borderWidth: '1.5px' }}
                                    />
                                </TableCell>
                                
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                        <Tooltip title="Editar Plantilla">
                                            <IconButton color="primary" size="small" onClick={() => editarPlantilla(row)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title="Eliminar Plantilla">
                                            <IconButton color="error" size="small" onClick={() => deletePlantilla(row.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={row.activo ? "Desactivar" : "Activar"}>
                                            <Switch 
                                                checked={Boolean(row.activo)}
                                                onChange={() => toggleEstado(row.id)}
                                                color="success"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}