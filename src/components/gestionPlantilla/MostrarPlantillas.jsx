import React from 'react';
import { 
    Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, IconButton, Chip, Tooltip, Box, Pagination 
} from '@mui/material';

import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
    TableHead, TableRow, IconButton, Chip, Box, Typography, Tooltip, Switch 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { DIAS_SEMANA } from '../../constants/diasSemana';

export function MostrarPlantillas({ plantillas, deletePlantilla, toggleEstado, editarPlantilla, paginaActual, totalPaginas, onChangePagina}){
    return (
        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid #f0f0f0' }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Nombre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Tipo</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Frecuencia</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Día</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Horario</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: '#475569' }}>Estado</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 'bold', color: '#475569' }}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {plantillas.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} align="center" sx={{ py: 5 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No hay plantillas creadas aún.
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        plantillas.map((row) => (
                            <TableRow 
                                key={row.id}
                                hover
                                sx={{ 
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:hover': { backgroundColor: '#fafafa' } 
                                }}
                            >
                                <TableCell sx={{ fontWeight: 'bold', color: '#1e293b' }}>
                                    {row.nombre}
                                </TableCell>
                                
                                <TableCell sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                                    {row.tipo || 'Otro'}
                                </TableCell>
                                
                                <TableCell sx={{ textTransform: 'capitalize', color: 'text.secondary' }}>
                                    {row.frecuencia || '—'}
                                </TableCell>

                                <TableCell sx={{ color: 'text.secondary' }}>
                                    {DIAS_SEMANA[row.diaSemana]}
                                </TableCell>
                                
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                        <AccessTimeIcon sx={{ fontSize: 16 }} />
                                        <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>
                                            {row.horaInicio} - {row.horaFin}
                                        </Typography>
                                    </Box>
                                </TableCell>
                                
                                <TableCell>
                                    <Chip 
                                        label={row.activo ? "Activo" : "Inactivo"} 
                                        color={row.activo ? "success" : "default"} 
                                        size="small" 
                                        variant="outlined"
                                        sx={{ fontWeight: 700, borderWidth: '1.5px' }}
                                    />
                                </TableCell>
                                
                                <TableCell align="center">
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                                        <Tooltip title="Editar Plantilla">
                                            <IconButton color="primary" size="small" onClick={() => editarPlantilla(row)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title="Eliminar Plantilla">
                                            <IconButton color="error" size="small" onClick={() => deletePlantilla(row.id)}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={row.activo ? "Desactivar" : "Activar"}>
                                            <Switch 
                                                checked={Boolean(row.activo)}
                                                onChange={() => toggleEstado(row.id)}
                                                color="success"
                                                size="small"
                                                sx={{ ml: 1 }}
                                            />
                                        </Tooltip>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ) : (
                            plantillas.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.nombre}</TableCell>
                                    <TableCell>
                                        <Chip label={row.tipo} size="small" variant="outlined" />
                                    </TableCell>
                                    {/* Mantiene la corrección: row.diaSemana ya es un string como "Lunes" */}
                                    <TableCell>{row.diaSemana}</TableCell>
                                    <TableCell>{`${row.horaInicio} a ${row.horaFin}`}</TableCell>
                                    <TableCell>
                                        <Chip 
                                            label={row.activo ? "Activo" : "Inactivo"} 
                                            color={row.activo ? "success" : "default"} 
                                            size="small" 
                                        />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Tooltip title={row.activo ? "Desactivar" : "Activar"}>
                                            <IconButton 
                                                color={row.activo ? "success" : "default"} 
                                                onClick={() => toggleEstado(row.id)}
                                            >
                                                {row.activo ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title="Editar">
                                            <IconButton color="primary" onClick={() => editarPlantilla(row)}>
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        
                                        <Tooltip title="Eliminar">
                                            <IconButton color="error" onClick={() => deletePlantilla(row.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            {totalPaginas > 0 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, pb: 3 }}>
                    <Pagination 
                        count={totalPaginas} 
                        page={paginaActual} 
                        onChange={(event, value) => onChangePagina(value)} 
                        color="primary" 
                    />
                </Box>
            )}
        </Box>
    );
}