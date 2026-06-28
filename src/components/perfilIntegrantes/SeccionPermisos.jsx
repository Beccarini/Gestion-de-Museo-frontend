import React from 'react';
import { Card, CardContent, Typography, Box, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const SeccionPermisos = ({ permisosIniciales }) => {
    const listaPermisos = Array.isArray(permisosIniciales) 
        ? permisosIniciales 
        : (permisosIniciales?.permisos || []);

    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', minHeight: '180px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <SecurityIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Permisos
                    </Typography>
                    <Chip 
                        label={listaPermisos.length} 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 'bold', ml: 'auto' }} 
                    />
                </Box>
                <Divider sx={{ mb: 3 }} />

                {listaPermisos && listaPermisos.length > 0 ? (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Descripción del Permiso</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Días Permitidos</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold' }}>Franja Horaria</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaPermisos.map((permiso) => (
                                    <TableRow key={permiso.id} hover>
                                        <TableCell sx={{ fontWeight: 500, color: 'text.primary' }}>
                                            {permiso.descripcion}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                                <CalendarMonthIcon sx={{ fontSize: 16, color: 'action.active', mr: 0.5 }} />
                                                {Array.isArray(permiso.diasSemana) && permiso.diasSemana.length > 0 ? (
                                                    permiso.diasSemana.map((dia, idx) => (
                                                        <Chip 
                                                            key={idx} 
                                                            label={dia} 
                                                            size="small" 
                                                            variant="outlined"
                                                            sx={{ fontSize: '0.75rem', height: '20px' }}
                                                        />
                                                    ))
                                                ) : (
                                                    <Typography variant="caption" color="text.secondary">No especificados</Typography>
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                <AccessTimeIcon sx={{ fontSize: 16, color: 'action.active' }} />
                                                <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                                    {permiso.horaInicio} - {permiso.horaFin}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
                        p: 2
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            Este integrante no posee permisos cargados en el sistema.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default SeccionPermisos;