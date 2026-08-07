import React from 'react';
import { 
    Card, CardContent, Typography, Box, Chip, Table, 
    TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Tooltip, IconButton 
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import LinkOffIcon from '@mui/icons-material/LinkOff';

export function SeccionIntegrantes({ integrantes = [], onAbrirAsignar, onDesvincular, onVerIntegrante }) {
    
    const listaIntegrantes = Array.isArray(integrantes) ? integrantes : [];

    return (
        <Card variant="outlined" sx={{ borderRadius: 2, width: '100%', mb: 4, display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: { xs: 2, md: 3 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                    <GroupIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                        Integrantes Asignados
                    </Typography>
                    <Chip 
                        label={listaIntegrantes.length} 
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
                        Asignar Integrante
                    </Button>
                </Box>

                {listaIntegrantes.length === 0 ? (
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                            Aún no hay integrantes asignados.
                        </Typography>
                    </Box>
                ) : (
                    <TableContainer sx={{ flexGrow: 1 }}>
                        <Table size="small" sx={{ minWidth: 650 }}>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: 'action.hover' }}>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Nombre</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Legajo</TableCell>
                                    <TableCell sx={{ fontWeight: 'bold', borderBottom: 'none' }}>Carrera</TableCell>
                                    <TableCell align="right" sx={{ borderBottom: 'none' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listaIntegrantes.map((integrante, index) => {
                                    const isLast = index === listaIntegrantes.length - 1;
                                    const borderStyle = isLast ? { borderBottom: 'none' } : {};

                                    return (
                                        <TableRow 
                                            key={integrante.id} 
                                            hover
                                            onClick={() => onVerIntegrante && onVerIntegrante(integrante.id)}
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(25, 118, 210, 0.04)'
                                                }
                                            }}
                                        >
                                            <TableCell sx={{ fontWeight: 500, color: 'text.primary', ...borderStyle }}>
                                                {integrante.nombre || integrante.Nombre || 'Sin nombre'}
                                            </TableCell>
                                            
                                            <TableCell sx={{ color: 'text.secondary', ...borderStyle, fontFamily: 'monospace' }}>
                                                {integrante.legajo || integrante.Legajo || '—'}
                                            </TableCell>
                                            
                                            <TableCell sx={{ color: 'text.secondary', ...borderStyle }}>
                                                {integrante.carrera || integrante.Carrera || '—'}
                                            </TableCell>
                                            
                                            <TableCell align="right" sx={{ ...borderStyle }}>
                                                <Tooltip title="Desvincular">
                                                    <IconButton 
                                                        size="small" 
                                                        color="error" 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            onDesvincular(integrante.id);
                                                        }}
                                                    >
                                                        <LinkOffIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </CardContent>
        </Card>
    );
}

export default SeccionIntegrantes;