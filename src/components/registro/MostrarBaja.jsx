import React from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Typography, 
    CircularProgress, Box, Tooltip, IconButton, Pagination 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

export function MostrarBaja({ 
    registros, 
    cargando, 
    deleteRegistro, 
    paginaActual, 
    totalPaginas, 
    onChangePagina 
}) {
    
    if (cargando) {
        return (
            <Box display="flex" sx={{ flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <CircularProgress size={50} />
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    Cargando registros...
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de registros">
                    <TableHead sx={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #edf2f7' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Fecha</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Integrante (ID)</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Evento (ID)</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#4a5568' }}>Asistencia</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#4a5568' }}>Apertura</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 'bold', color: '#4a5568' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {registros && registros.length > 0 ? (
                            registros.map((row) => (
                                <TableRow 
                                    key={row.id}
                                    sx={{ 
                                        '&:last-child td, &:last-child th': { border: 0 },
                                        '&:hover': { backgroundColor: '#fcfcfc' } 
                                    }}
                                >
                                    <TableCell>
                                        {row.fecha ? dayjs(row.fecha).format('DD/MM/YYYY HH:mm:ss') : '—'}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        {row.integranteId || '—'}
                                    </TableCell>
                                    <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
                                        {row.eventoId || '—'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.esAsistencia ? 'Sí' : 'No'}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.esApertura ? 'Sí' : 'No'}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title="Eliminar">
                                            <IconButton 
                                                color="error" 
                                                size="small"
                                                sx={{ 
                                                    mx: 0.5, 
                                                    backgroundColor: '#fff5f5', 
                                                    '&:hover': { backgroundColor: '#fed7d7' } 
                                                }}
                                                onClick={() => deleteRegistro(row.id)}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                    <Typography variant="body1" color="textSecondary">
                                        No se encontraron registros.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Paginación */}
            {totalPaginas > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                    <Pagination 
                        count={totalPaginas} 
                        page={paginaActual} 
                        onChange={(event, value) => onChangePagina(value)} 
                        color="primary" 
                    />
                </Box>
            )}
        </Box>
    );
}