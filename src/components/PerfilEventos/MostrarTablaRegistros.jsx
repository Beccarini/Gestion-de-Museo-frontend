import React from "react";
import { 
    Card, CardContent, Typography, Box, Divider, Chip, Table, 
    TableBody, TableCell, TableContainer, TableHead, TableRow, Pagination 
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';

export function MostrarTablaRegistros({
    registros, totalPaginas, pagina, onChangePagina, totalRegistros 
}) {
    
    return(
        <Card variant="outlined" sx={{ borderRadius: 2, width: '100%', mb: 4, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <EventNoteIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Registros
                    </Typography>
                    <Chip 
                        label={totalRegistros || 0} 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                    />
                </Box>

                {registros.length === 0 ? (
                    <Box sx={{ 
                        flexGrow: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        textAlign: 'center',
                        width: '100%',
                        p: 2
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            No hay asistencias registradas para este evento.
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <TableContainer sx={{ flexGrow: 1 }}>
                            <Table size="small" sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Día</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Hora</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Integrante</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Tipo</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Estado</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {registros.map((row, index) => {
                                        const fechaObj = row.fecha ? new Date(row.fecha) : null;
                                        const dia = fechaObj ? fechaObj.toLocaleDateString('es-AR') : '—';
                                        const hora = fechaObj ? fechaObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute:'2-digit' }) : '—';
                                        
                                        const isLast = index === registros.length - 1;
                                        const borderStyle = isLast ? { borderBottom: 'none' } : {};

                                        return (
                                            <TableRow key={row.id} hover>
                                                
                                                <TableCell sx={{ fontWeight: 500, color: 'text.primary', ...borderStyle }}>
                                                    {dia}
                                                </TableCell>
                                                
                                                <TableCell sx={{ color: 'text.secondary', ...borderStyle }}>
                                                    {hora} {hora !== '—' && 'm.'}
                                                </TableCell>
                                                
                                                <TableCell sx={{ color: 'text.secondary', ...borderStyle }}>
                                                    {row.Integrante ? `${row.Integrante.nombre} ${row.Integrante.apellido || ''}` : '—'}
                                                </TableCell>
                                                
                                                <TableCell sx={{ ...borderStyle }}>
                                                    <Chip 
                                                        label={row.esAsistencia ? 'Asistencia' : 'Apertura'} 
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ 
                                                            fontWeight: 600, 
                                                            color: row.esAsistencia ? '#9c27b0' : '#0288d1',
                                                            borderColor: row.esAsistencia ? '#9c27b0' : '#0288d1'
                                                        }}
                                                    />
                                                </TableCell>

                                                <TableCell sx={{ ...borderStyle }}>
                                                    <Chip 
                                                        label="Autorizado" 
                                                        size="small"
                                                        variant="outlined"
                                                        color="success"
                                                        sx={{ fontWeight: 600 }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                        {totalPaginas > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}>
                                <Pagination 
                                    count={totalPaginas} 
                                    page={pagina} 
                                    onChange={(event, value) => onChangePagina(value)} 
                                    color="primary" 
                                />
                            </Box>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}