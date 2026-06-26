import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const TablaUltimosRegistros = ({ registros, integranteId }) => {
    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Últimos Registros de Acceso
                    </Typography>
                    <Button 
                        component={Link}
                        to={`/registros?integranteId=${integranteId}`}
                        variant="text" 
                        color="primary" 
                        endIcon={<FormatListBulletedIcon />}
                    >
                        Ver historial completo
                    </Button>
                </Box>

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
                                    // Separamos la fecha y la hora
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
                                                {/* Intenta mostrar el nombre del evento, si no cae al ID, y si no hay, un guion */}
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
                    <Box sx={{ textAlign: 'center', py: 6, color: 'text.secondary', flexGrow: 1 }}>
                        <Typography variant="body1">No hay registros recientes para este integrante.</Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default TablaUltimosRegistros;