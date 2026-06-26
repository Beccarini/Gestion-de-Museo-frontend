import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';

const TablaUltimosRegistros = ({ registros, integranteId }) => {
    const navigate = useNavigate();

    const handleVerHistorial = () => {
        navigate(`/registros?integranteId=${integranteId}`);
    };

    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Últimos Registros de Acceso
                    </Typography>
                    <Button 
                        variant="text" 
                        color="primary" 
                        endIcon={<FormatListBulletedIcon />}
                        onClick={handleVerHistorial}
                    >
                        Ver historial completo
                    </Button>
                </Box>

                {registros && registros.length > 0 ? (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Fecha y Hora</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Tipo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {registros.map((reg) => (
                                    <TableRow key={reg.id} hover>
                                        <TableCell>
                                            {new Date(reg.fecha).toLocaleString('es-AR')}
                                        </TableCell>
                                        <TableCell>
                                            {reg.esApertura ? "Apertura de Puerta" : "Lectura de Asistencia"}
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
                                ))}
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