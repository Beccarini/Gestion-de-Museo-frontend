import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
export function MostrarBaja({registros,setRegistros}){
    const handleEliminar = (id) => {
        setRegistros(registros.filter((registro) => registro.id !== id));
    };
    return(
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Integrante ID</TableCell>
                        <TableCell>Asistencia</TableCell>
                        <TableCell align="center">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {registros.length === 0 ? 
                        (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    No hay registros creados aún.
                                </TableCell>
                            </TableRow>
                        ) : (
                            registros.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.fecha ? new Date(row.fecha).toLocaleString() : ''}</TableCell>
                                    <TableCell>{row.integranteId}</TableCell>
                                    <TableCell>{row.esAsistencia ? 'Sí' : 'No'}</TableCell>
                                    <TableCell align="center">
                                        <IconButton color="error" onClick={() => handleEliminar(row.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}