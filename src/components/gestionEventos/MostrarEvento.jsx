import React from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, IconButton, Typography, Tooltip, Box 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Link } from 'react-router-dom';

const formatearFechaHora = (fecha) => {
    if (!fecha) return '—';
    const d = new Date(fecha);
    return d.toLocaleString('es-AR', { 
        hour: '2-digit', minute: '2-digit', 
        day: '2-digit', month: '2-digit', year: 'numeric' 
    });
};

export function MostrarEvento({ eventos, deleteEvento, onEditar }) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Descripción</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Plantilla</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Día</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Horario</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {eventos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No hay eventos registrados aún.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        eventos.map((evento) => (
                            <TableRow 
                                key={evento.id} 
                                hover 
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#fafafa' } 
                                }}
                            >
                                <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                    {evento.nombre}
                                </TableCell>
                                
                                <TableCell sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                                    {evento.tipo || 'Otro'}
                                </TableCell>
                                
                                <TableCell>
                                    {evento.descripcion ? (
                                        <Tooltip title={evento.descripcion} arrow placement="top">
                                            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 150, cursor: 'default' }}>
                                                {evento.descripcion}
                                            </Typography>
                                        </Tooltip>
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">—</Typography>
                                    )}
                                </TableCell>

                                <TableCell sx={{ color: 'text.secondary' }}>
                                    {evento.Plantilla?.nombre || evento.plantillaId || '—'}
                                </TableCell>
                                
                                <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                    {evento.fechaInicio instanceof Date 
                                        ? evento.fechaInicio.toLocaleDateString('es-AR') 
                                        : '—'
                                    }
                                </TableCell>

                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                                        <CalendarMonthIcon sx={{ fontSize: 18 }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                                            {evento.fechaInicio instanceof Date 
                                                ? evento.fechaInicio.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) 
                                                : '—'
                                            }
                                            {evento.fechaFin instanceof Date && 
                                                ` - ${evento.fechaFin.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' })}`
                                            }
                                        </Typography>
                                    </Box>
                                </TableCell>
                                
                                <TableCell align="center">
                                    <Tooltip title="Ver Detalles del Evento">
                                        <IconButton 
                                            color="info" 
                                            size="small" 
                                            component={Link}
                                            to={`/eventos/${evento.id}`}
                                        >
                                            <VisibilityIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar Evento">
                                        <IconButton 
                                            color="primary" 
                                            size="small" 
                                            onClick={() => onEditar(evento)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar Evento">
                                        <IconButton 
                                            color="error" 
                                            size="small"
                                            onClick={() => deleteEvento(evento.id)}
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
}