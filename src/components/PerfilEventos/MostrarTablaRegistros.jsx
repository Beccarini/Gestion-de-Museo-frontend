import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Button, Divider, Grid 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function MostrarTablaRegistros({handleEliminarRegistro, registros}){
    return(
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
            <Table>
                <TableHead sx={{ backgroundColor: '#f8f9fa' }}>
                    <TableRow>
                        <TableCell><strong>Fecha y Hora</strong></TableCell>
                        <TableCell><strong>ID Integrante</strong></TableCell>
                        <TableCell><strong>Nombre Integrante</strong></TableCell>
                        <TableCell><strong>Tipo de Registro</strong></TableCell>
                        <TableCell align="center"><strong>Acciones</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {registros.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} align="center" sx={{ py: 3, color: 'text.secondary' }}>
                                No hay asistencias ni marcas de acceso registradas para este evento.
                            </TableCell>
                        </TableRow>
                    ) : (
                        registros.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>
                                    {row.fecha ? new Date(row.fecha).toLocaleString('es-AR') : '—'}
                                </TableCell>
                                <TableCell>{row.integranteId || 'Anonimo / Token'}</TableCell>
                                <TableCell>
                                    {/* Si tu backend incluye la relación del integrante mapeada, muéstrala aquí */}
                                    {row.integrante ? `${row.integrante.nombre} ${row.integrante.apellido}` : '—'}
                                </TableCell>
                                <TableCell>
                                    <Box 
                                        component="span" 
                                        sx={{
                                            px: 1.5, py: 0.5, borderRadius: 1, fontSize: '0.85rem', fontWeight: 500,
                                            backgroundColor: row.esAsistencia ? '#e6fffa' : '#fff5f5',
                                            color: row.esAsistencia ? '#00875a' : '#de350b'
                                        }}
                                    >
                                        {row.esAsistencia ? 'Asistencia' : 'Acceso/Apertura'}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton 
                                        color="error" 
                                        size="small"
                                        onClick={() => handleEliminarRegistro(row.id)}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};