import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, Button, Divider } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const TablaUltimosRegistros = ({ registros, integranteId }) => {
    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    {/* USAMOS EL NOMBRE EXACTO DEL IMPORT */}
                    <ListAltIcon color="info" />
                    
                    <Typography variant="h6" fontWeight="bold">
                        Últimos Registros
                    </Typography>
                    
                    <Box sx={{ ml: 'auto' }}>
                        <Button variant="text" size="small" endIcon={<FormatListBulletedIcon />}>
                            VER HISTORIAL COMPLETO
                        </Button>
                    </Box>
                </Box>
                <Divider sx={{ mb: 3 }} />
            

                {registros && registros.length > 0 ? (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Día</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Hora</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Evento</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {registros.map((reg) => {
                                    const fechaObj = new Date(reg.fecha);
                                    const dia = fechaObj.toLocaleDateString('es-AR');
                                    const hora = fechaObj.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

                                    return (
                                        <TableRow key={reg.id} hover>
                                            <TableCell>{dia}</TableCell>
                                            <TableCell>{hora}</TableCell>
                                            <TableCell>
                                                {/* Mostramos tags según los booleanos del modelo */}
                                                <Box sx={{ display: 'flex', gap: 1 }}>
                                                    {reg.esApertura && (
                                                        <Chip label="Apertura" size="small" color="info" variant="outlined" />
                                                    )}
                                                    {reg.esAsistencia && (
                                                        <Chip label="Asistencia" size="small" color="secondary" variant="outlined" />
                                                    )}
                                                    {!reg.esApertura && !reg.esAsistencia && '—'}
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {reg.Evento?.nombre || reg.eventoId || '—'}
                                            </TableCell>
                                            <TableCell>
                                                <Chip 
                                                    label={reg.mensajeError ? "Rechazado" : "Autorizado"} 
                                                    color={reg.mensajeError ? "error" : "success"}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Box sx={{                         
                        flexGrow: 1, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        textAlign: 'center',
                        width: '100%',
                        p: 2}}>
                        <Typography variant="body1">No hay registros recientes para este integrante.</Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default TablaUltimosRegistros;