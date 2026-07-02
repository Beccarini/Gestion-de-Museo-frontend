import React from 'react';
import { 
    Paper, Table, TableBody, TableCell, TableContainer, 
    TableHead, TableRow, IconButton, Chip, Tooltip, Box, Pagination 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';

export function MostrarPlantillas({ plantillas, deletePlantilla, toggleEstado, editarPlantilla, paginaActual, totalPaginas, onChangePagina}){
    return (
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Día</TableCell>
                            <TableCell>Horario</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell align="center">Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plantillas.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No hay plantillas creadas aún.
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