import React from 'react';
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function MostrarBaja({ registros, deleteRegistro }) {
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Día</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Hora</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Integrante</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Evento</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                
                <TableBody>
                    {registros.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No hay registros creados aún.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        registros.map((row) => {
                            const fechaObj = row.fecha ? new Date(row.fecha) : null;
                            const dia = fechaObj ? fechaObj.toLocaleDateString('es-AR') : '—';
                            const hora = fechaObj ? fechaObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' }) : '—';

                            return (
                                <TableRow 
                                    key={row.id} 
                                    hover
                                    sx={{ 
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { backgroundColor: '#fafafa' } 
                                    }}
                                >
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                        {dia}
                                    </TableCell>
                                    
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {hora}
                                    </TableCell>
                                    
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {row.Integrante?.nombre || row.integranteId || '—'}
                                    </TableCell>
                                    
                                    <TableCell sx={{ color: 'text.secondary' }}>
                                        {row.Evento?.nombre || row.eventoId || '—'}
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            {row.esApertura && (
                                                <Chip label="Apertura" size="small" color="info" variant="outlined" sx={{ fontWeight: 700, borderWidth: '1.5px' }} />
                                            )}
                                            {row.esAsistencia && (
                                                <Chip label="Asistencia" size="small" color="secondary" variant="outlined" sx={{ fontWeight: 700, borderWidth: '1.5px' }} />
                                            )}
                                            {!row.esApertura && !row.esAsistencia && '—'}
                                        </Box>
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Chip 
                                            label={row.mensajeError ? "Rechazado" : "Autorizado"} 
                                            color={row.mensajeError ? "error" : "success"}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontWeight: 700, borderWidth: '1.5px' }}
                                        />
                                    </TableCell>
                                    
                                    <TableCell align="center">
                                        <Tooltip title="Eliminar registro">
                                            <IconButton 
                                                color="error" 
                                                size="small"
                                                onClick={() => deleteRegistro(row.id)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}