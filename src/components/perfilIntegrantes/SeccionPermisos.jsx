import React from 'react';
import { Card, CardContent, Typography, Box, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const SeccionPermisos = ({ permisosIniciales, onAbrirAsignar, onDesvincular }) => {
    const listaPermisos = Array.isArray(permisosIniciales) 
        ? permisosIniciales 
        : (permisosIniciales?.integrante?.permisos || permisosIniciales?.permisos || []);

    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', minHeight: '180px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Encabezado */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <SecurityIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Permisos
                    </Typography>
                    <Chip 
                        label={listaPermisos.length} 
                        color="primary" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                    />
                    
                    <Button 
                        variant="outlined" 
                        size="small" 
                        startIcon={<AddIcon />}
                        sx={{ ml: 'auto', borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                        onClick={onAbrirAsignar}
                    >
                        Asignar
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {listaPermisos && listaPermisos.length > 0 ? (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small" sx={{ minWidth: 350 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Descripción</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Días Permitidos</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Franja Horaria</TableCell>
                                    <TableCell sx={{ borderBottom: 'none' }} align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaPermisos.map((permiso, index) => {
                                    const isLast = index === listaPermisos.length - 1;
                                    const borderStyle = isLast ? { borderBottom: 'none' } : {};

                                    return (
                                        <TableRow key={permiso.id} hover>
                                            <TableCell sx={{ fontWeight: 500, color: 'text.primary', ...borderStyle }}>
                                                {permiso.descripcion}
                                            </TableCell>
                                            
                                            <TableCell sx={{ ...borderStyle, minWidth: '160px' }}>
                                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
                                                    <CalendarMonthIcon sx={{ fontSize: 16, color: 'action.active', mr: 0.5 }} />
                                                    {Array.isArray(permiso.diasSemana) && permiso.diasSemana.length > 0 ? (
                                                        permiso.diasSemana.map((dia, idx) => (
                                                            <Chip 
                                                                key={idx} 
                                                                label={dia} 
                                                                size="small" 
                                                                variant="outlined"
                                                                sx={{ fontSize: '0.70rem', height: '22px' }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <Typography variant="caption" color="text.secondary">No especificados</Typography>
                                                    )}
                                                </Box>
                                            </TableCell>

                                            <TableCell sx={{ ...borderStyle }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                                    <AccessTimeIcon sx={{ fontSize: 16, color: 'action.active' }} />
                                                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                                                        {permiso.horaInicio} - {permiso.horaFin}
                                                    </Typography>
                                                </Box>
                                            </TableCell>

                                            <TableCell align="right" sx={{ ...borderStyle }}>
                                                <Tooltip title="Revocar permiso">
                                                    <IconButton 
                                                        size="small" 
                                                        color="error" 
                                                        onClick={() => onDesvincular(permiso.id, permiso.descripcion)}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
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
                        p: 2
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            Este integrante no posee permisos cargados.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default SeccionPermisos;