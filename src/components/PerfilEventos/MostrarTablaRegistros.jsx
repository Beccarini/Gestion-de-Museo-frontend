import React from "react";
import { 
    Box, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, TablePagination, Typography, Chip, Tooltip 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export function MostrarTablaRegistros({
    handleEliminarRegistro, 
    registros, 
    totalRegistros, 
    pagina, 
    limite, 
    onChangePagina, 
    onChangeLimite
}) {
    return(
        <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0', overflow: 'hidden' }}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Fecha y Hora</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>ID / Token</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Nombre Integrante</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Tipo de Registro</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {registros.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 5 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No hay asistencias ni marcas de acceso registradas para este evento.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            registros.map((row) => (
                                <TableRow 
                                    key={row.id} 
                                    hover
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor: '#fafafa' } }}
                                >
                                    <TableCell sx={{ fontWeight: 500, color: '#1e293b' }}>
                                        {row.fecha ? new Date(row.fecha).toLocaleString('es-AR', { hour: '2-digit', minute:'2-digit', day:'2-digit', month:'2-digit', year:'numeric' }) : '—'}
                                    </TableCell>
                                    
                                    <TableCell sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                                        {row.integranteId || 'Anónimo'}
                                    </TableCell>
                                    
                                    <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                        {row.integrante ? `${row.integrante.nombre} ${row.integrante.apellido}` : '—'}
                                    </TableCell>
                                    
                                    <TableCell>
                                        <Chip 
                                            label={row.esAsistencia ? 'Asistencia' : 'Apertura'} 
                                            color={row.esAsistencia ? 'success' : 'info'}
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
                                                onClick={() => handleEliminarRegistro(row.id)}
                                                sx={{ mx: 0.5, backgroundColor: '#fff5f5', '&:hover': { backgroundColor: '#fed7d7' } }}
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
            
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalRegistros}
                rowsPerPage={limite}
                page={Math.max(0, pagina - 1)}
                onPageChange={(event, nuevaPagina) => onChangePagina(nuevaPagina + 1)}
                onRowsPerPageChange={(event) => {
                    onChangeLimite(parseInt(event.target.value, 10));
                    onChangePagina(1);
                }}
                labelRowsPerPage="Filas por página:"
                sx={{ borderTop: '1px solid #f0f0f0' }}
            />
        </Paper>
    );
};