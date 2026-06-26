import React from 'react';
import { Link } from 'react-router-dom';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Typography, 
    CircularProgress, Box, Tooltip, IconButton, 
    Switch
} from '@mui/material';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TablaIntegrantes = ({ integrantes, cargando, onToggleEstado, onEliminar, onEditar }) => {
    
    if (cargando) {
        return (
            <Box display="flex" sx={{ flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <CircularProgress size={50} />
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    Cargando base de datos...
                </Typography>
            </Box>
        );
    }

    return (
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de integrantes">
                
                <TableHead sx={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #edf2f7' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Legajo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Token</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#4a5568' }}>Carrera</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#4a5568' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#4a5568' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {integrantes && integrantes.length > 0 ? (
                        integrantes.map((integrante) => (
                            <TableRow 
                                key={integrante.id} 
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#fcfcfc' } 
                                }}
                            >
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {integrante.nombre}
                                </TableCell>
                                
                                <TableCell>{integrante.legajo || '—'}</TableCell>
                                
                                <TableCell sx={{ fontFamily: 'monospace', color: integrante.token ? 'inherit' : 'text.disabled' }}>
                                    {integrante.token || '—'}
                                </TableCell>
                                
                                <TableCell>{integrante.carrera || 'Sistemas'}</TableCell>
                                
                                <TableCell align="center">
                                    <Tooltip title={integrante.esActivo ? "Desactivar" : "Activar"}>
                                        <Switch 
                                            checked={Boolean(integrante.esActivo)}
                                            onChange={() => onToggleEstado(integrante.id)}
                                            color="success"
                                            size="medium"
                                        />
                                    </Tooltip>
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title="Editar">
                                        <IconButton 
                                            color="primary" 
                                            size="small" 
                                            sx={{ 
                                                mx: 0.5, 
                                                backgroundColor: '#ebf8ff', 
                                                '&:hover': { backgroundColor: '#bee3f8' } 
                                            }}
                                            onClick={() => onEditar(integrante)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton 
                                            color="error" 
                                            size="small"
                                            sx={{ 
                                                mx: 0.5, 
                                                backgroundColor: '#fff5f5', 
                                                '&:hover': { backgroundColor: '#fed7d7' } 
                                            }}
                                            onClick={() => onEliminar(integrante.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Ver Perfil Completo">
                                        <IconButton 
                                            component={Link}
                                            to={`/integrantes/${integrante.id}`}
                                            color="primary" 
                                        >
                                            <PersonSearchIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="textSecondary">
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