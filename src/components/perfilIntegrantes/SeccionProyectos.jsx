import React from 'react';
import { Card, CardContent, Typography, Box, Divider, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddIcon from '@mui/icons-material/Add';
import EventIcon from '@mui/icons-material/Event';

// Función para formatear fechas al formato local
const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '—';
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

// Función para asignar colores a los estados
const getEstadoColor = (estado) => {
    const est = estado?.toLowerCase() || '';
    if (est === 'en curso' || est === 'activo') return 'success';
    if (est === 'pendiente' || est === 'en planificación') return 'warning';
    if (est === 'finalizado' || est === 'inactivo') return 'default';
    return 'primary';
};

const SeccionProyectos = ({ proyectosIniciales }) => {
    // Buscamos el array donde sea que venga según la respuesta del backend
    const listaProyectos = Array.isArray(proyectosIniciales) 
        ? proyectosIniciales 
        : (proyectosIniciales?.proyectos || proyectosIniciales?.integrante?.proyectos || []);

    return (
        <Card elevation={3} sx={{ borderRadius: 2, height: '100%', minHeight: '180px', width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                {/* Encabezado */}
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <AccountTreeIcon color="secondary" />
                    <Typography variant="h6" fontWeight="bold">
                        Proyectos
                    </Typography>
                    <Chip 
                        label={listaProyectos.length} 
                        color="secondary" 
                        size="small" 
                        sx={{ fontWeight: 'bold' }} 
                    />

                    {/* BOTÓN ASIGNAR */}
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        size="small" 
                        startIcon={<AddIcon />}
                        sx={{ ml: 'auto', borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
                        onClick={() => alert('Próximamente: Modal para asignar proyecto')}
                    >
                        Asignar
                    </Button>
                </Box>
                <Divider sx={{ mb: 2 }} />

                {listaProyectos && listaProyectos.length > 0 ? (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small" sx={{ minWidth: 400 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none', width: '45%' }}>Proyecto</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Período</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Estado</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaProyectos.map((proyecto, index) => {
                                    const isLast = index === listaProyectos.length - 1;
                                    const borderStyle = isLast ? { borderBottom: 'none' } : {};

                                    return (
                                        <TableRow key={proyecto.id} hover>
                                            
                                            {/* Columna Nombre y Descripción */}
                                            <TableCell sx={{ ...borderStyle }}>
                                                <Typography variant="body2" fontWeight={600} color="text.primary">
                                                    {proyecto.nombre || 'Sin nombre'}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                                    {proyecto.descripcion || 'Sin descripción'}
                                                </Typography>
                                            </TableCell>
                                            
                                            {/* Columna Fechas */}
                                            <TableCell sx={{ ...borderStyle }}>
                                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <EventIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            Inicio: <Typography component="span" variant="caption" fontWeight={500} color="text.primary">{formatearFecha(proyecto.fechaInicio)}</Typography>
                                                        </Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                                        <EventIcon sx={{ fontSize: 14, color: 'text.secondary', opacity: 0.5 }} />
                                                        <Typography variant="caption" color="text.secondary">
                                                            Fin: <Typography component="span" variant="caption" fontWeight={500} color="text.primary">{formatearFecha(proyecto.fechaFin)}</Typography>
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>

                                            {/* Columna Estado */}
                                            <TableCell sx={{ ...borderStyle }}>
                                                <Chip 
                                                    label={proyecto.estado ? proyecto.estado.toUpperCase() : 'DESCONOCIDO'} 
                                                    size="small" 
                                                    color={getEstadoColor(proyecto.estado)}
                                                    variant="outlined"
                                                    sx={{ fontSize: '0.70rem', fontWeight: 'bold', height: '24px' }}
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
                        p: 2
                    }}>
                        <Typography variant="body1" color="text.secondary">
                            Este integrante no está asignado a ningún proyecto actualmente.
                        </Typography>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default SeccionProyectos;