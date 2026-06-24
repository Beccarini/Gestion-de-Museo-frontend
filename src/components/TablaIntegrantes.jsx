import React from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, Paper, Typography, 
    CircularProgress, Box, Chip, Tooltip, IconButton 
} from '@mui/material';

// Íconos de Material Design
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SwapVertIcon from '@mui/icons-material/SwapVert';

const TablaIntegrantes = ({ integrantes, cargando, onToggleEstado, onEliminar }) => {
    
    if (cargando) {
        return (
            <Box display="flex" sx={{
                flexDirection:'column', 
                alignItems:'center', 
                py: 10
            }}>
                <CircularProgress size={50} />
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    Cargando base de datos...
                </Typography>
            </Box>

        );
    }

    return (
        <TableContainer component={Paper} elevation={2}>
            <Table sx={{ minWidth: 650 }} aria-label="tabla de integrantes">
                
                <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Carrera</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {integrantes && integrantes.length > 0 ? (
                        integrantes.map((integrante) => (
                            <TableRow 
                                key={integrante.id} 
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {integrante.nombre}
                                </TableCell>
                                
                                <TableCell>
                                    {integrante.carrera || 'ISI'}
                                </TableCell>
                                
                                <TableCell align="center">
                                    <Chip 
                                        label={integrante.esActivo ? 'Activo' : 'Inactivo'} 
                                        color={integrante.esActivo ? 'success' : 'default'}
                                        size="small"
                                        variant={integrante.esActivo ? "filled" : "outlined"}
                                    />
                                </TableCell>

                                <TableCell align="center">
                                    <Tooltip title={integrante.esActivo ? "Desactivar" : "Activar"}>
                                        <IconButton 
                                            color={integrante.esActivo ? "warning" : "success"}
                                            onClick={() => onToggleEstado(integrante.id)}
                                            size="small"
                                        >
                                            <SwapVertIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Editar">
                                        <IconButton color="primary" size="small" sx={{ mx: 1 }}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Eliminar">
                                        <IconButton 
                                            color="error" 
                                            size="small"
                                            onClick={() => onEliminar(integrante.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ py: 3 }}>
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