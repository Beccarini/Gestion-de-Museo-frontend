import React from 'react';
import { 
    Paper, Table, TableBody, TableCell, TableContainer, 
<<<<<<< HEAD
    TableHead, TableRow, IconButton, Chip, Tooltip 
=======
    TableHead, TableRow, IconButton, Chip 
>>>>>>> 367ca93630868418cd6834f0c2d5d9a8afe09e65
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
<<<<<<< HEAD
import { SvgIcon } from '@mui/material';
=======
import { DIAS_SEMANA } from '../../constants/diasSemana';

>>>>>>> 367ca93630868418cd6834f0c2d5d9a8afe09e65
export function MostrarPlantillas({ plantillas, deletePlantilla, toggleEstado, editarPlantilla }) {
    return (
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
<<<<<<< HEAD
                                {/* Corrección: Ahora row.diaSemana es directamente el string "Lunes" */}
                                <TableCell>{row.diaSemana}</TableCell>
=======
                                <TableCell>{DIAS_SEMANA[row.diaSemana]}</TableCell>
>>>>>>> 367ca93630868418cd6834f0c2d5d9a8afe09e65
                                <TableCell>{`${row.horaInicio} a ${row.horaFin}`}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={row.activo ? "Activo" : "Inactivo"} 
                                        color={row.activo ? "success" : "default"} 
                                        size="small" 
                                    />
                                </TableCell>
                                <TableCell align="center">
<<<<<<< HEAD

=======
>>>>>>> 367ca93630868418cd6834f0c2d5d9a8afe09e65
                                    <IconButton 
                                        color={row.activo ? "success" : "default"} 
                                        onClick={() => toggleEstado(row.id)}
                                    >
                                        {row.activo ? <ToggleOnIcon /> : <ToggleOffIcon />}
                                    </IconButton>
                                    
                                    <IconButton color="primary" onClick={() => editarPlantilla(row)}>
                                        <EditIcon />
                                    </IconButton>
                                    
                                    <IconButton color="error" onClick={() => deletePlantilla(row.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}