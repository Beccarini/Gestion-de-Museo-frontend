import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Typography, 
    CircularProgress, Box, Tooltip, IconButton, 
    Switch, Chip 
} from '@mui/material';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TablaIntegrantes = ({ integrantes, cargando, onToggleEstado, onEliminar, onEditar }) => {
    
    if (cargando) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%',            
                py: 10                    
            }}>
                <CircularProgress size={50} />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Cargando base de datos...
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de integrantes">
                
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Legajo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Token</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Carrera</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {integrantes && integrantes.length > 0 ? (integrantes.map((integrante) => (
                        <TableRow 
                            key={integrante.id} 
                            hover 
                            sx={{ 
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { backgroundColor: '#fafafa' } 
                            }}
                        >
                            <TableCell component="th" scope="row" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                {integrante.nombre}
                            </TableCell>
                            
                            <TableCell sx={{ color: 'text.secondary' }}>
                                {integrante.legajo || '—'}
                            </TableCell>
                            
                            <TableCell sx={{ fontFamily: 'monospace', color: integrante.token ? 'inherit' : 'text.disabled' }}>
                                {integrante.token || '—'}
                            </TableCell>
                            
                            <TableCell sx={{ color: 'text.secondary' }}>
                                {integrante.carrera || 'Sistemas'}
                            </TableCell>
                            
                            <TableCell>
                                <Chip 
                                    label={integrante.esActivo ? 'activo' : 'inactivo'} 
                                    color={integrante.esActivo ? 'success' : 'default'}
                                    size="small" 
                                    variant="outlined" 
                                    sx={{ 
                                        fontWeight: 700, 
                                        textTransform: 'capitalize', 
                                        borderWidth: '1.5px' 
                                    }} 
                                />
                            </TableCell>

                            <TableCell align="center">
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                    
                                    <Tooltip title="Ver Perfil Completo">
                                        <IconButton 
                                            component={Link}
                                            to={`/integrantes/${integrante.id}`}
                                            color="info" 
                                            size="small"
                                        >
                                            <PersonSearchIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Editar integrante">
                                        <IconButton 
                                            color="primary" 
                                            size="small" 
                                            onClick={() => onEditar(integrante)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar integrante">
                                        <IconButton 
                                            color="error" 
                                            size="small"
                                            onClick={() => onEliminar(integrante.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title={integrante.esActivo ? "Desactivar" : "Activar"}>
                                        <Switch 
                                            checked={Boolean(integrante.esActivo)}
                                            onChange={() => onToggleEstado(integrante.id)}
                                            color="success"
                                            size="small"
                                            sx={{ ml: 1 }} 
                                        />
                                    </Tooltip>

                                </Box>
                            </TableCell>
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No se encontraron integrantes.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TablaIntegrantes;