import React from 'react';
import { 
    Box, Typography, Paper, Divider, Grid, IconButton, Tooltip 
} from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export function MostrarRecursos({recursos, setRecursoAEditar, onReload, borrarRecurso}) {
    if (!recursos || recursos.length === 0) {
        return (
            <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 3, border: '1px solid #f0f0f0' }}>
                <Typography variant="h6" color="text.secondary">
                    No hay recursos cargados
                </Typography>
            </Paper>
        );
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {recursos.map((recurso) => (
                <Paper 
                    key={recurso.id} 
                    elevation={0} 
                    sx={{ 
                        p: { xs: 3, md: 4 }, 
                        borderRadius: 3, 
                        border: '1px solid #f0f0f0',
                        position: 'relative'
                    }}
                >
                    <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
                        <Tooltip title="Editar">
                            <IconButton 
                                onClick={() => setRecursoAEditar && setRecursoAEditar(recurso)} 
                                size="small"
                                sx={{ color: '#0288d1', bgcolor: '#f0f9ff', '&:hover': { bgcolor: '#e0f2fe' } }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                            <IconButton 
                                onClick={()=>borrarRecurso(recurso.id)}
                                size="small"
                                sx={{ color: '#d32f2f', bgcolor: '#fef2f2', '&:hover': { bgcolor: '#fee2e2' } }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 800, color: '#1e293b', pr: 10 }}>
                        {recurso.nombre}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Categoría:
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, textTransform: 'capitalize', color: '#0288d1' }}>
                            {recurso.categoria || 'Sin categoría'}
                        </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 3, borderColor: '#f8fafc' }} />
                    
                    <Grid container spacing={4}>
                        {/* Columna de Descripción */}
                        <Grid item xs={12} md={7}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 1 }}>
                                Descripción
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#475569', lineHeight: 1.6 }}>
                                {recurso.descripcion || 'Sin descripción disponible.'}
                            </Typography>
                        </Grid>

                        {/* Columna de Detalles / Inventario */}
                        <Grid item xs={12} md={5} sx={{ borderLeft: { md: '1px solid #f0f0f0' }, pl: { md: 4 } }}>
                            <Typography variant="subtitle2" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 1, mb: 2 }}>
                                Detalles de Inventario
                            </Typography>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                <InventoryIcon sx={{ color: '#94a3b8' }} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">STOCK DISPONIBLE</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e293b', fontSize: '1rem' }}>
                                        {recurso.stock !== undefined ? recurso.stock : '0'} unidades
                                    </Typography>
                                </Box>
                            </Box>
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <CalendarMonthIcon sx={{ color: '#94a3b8' }} />
                                <Box>
                                    <Typography variant="caption" color="text.secondary" display="block">REGISTRADO EL</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: '#1e293b', fontSize: '0.9rem' }}>
                                        {recurso.createdAt 
                                            ? new Date(recurso.createdAt).toLocaleDateString('es-AR') 
                                            : 'Fecha desconocida'
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            ))}
        </Box>
    );
}