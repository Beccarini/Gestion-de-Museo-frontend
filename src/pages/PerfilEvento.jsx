import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Button, Divider, Grid 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getEventoById, getRegistrosByEvento } from '../services/eventoService';
export function PerfilEvento(){
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [cargando, setCargando] = useState(true);
    useEffect(()=>{
        obtenerEventoPorId();
    },[id])
    function obtenerEventoPorId(){
        getEventoById(id)
        .then((data)=>{
            setEvento(data);
            setCargando(false);
        })
        .catch((error)=>{
            console.log(error);
        });
        getRegistrosByEvento(id,1,5)
        .then((data)=>{
            setRegistros(data.registrosPaginados.registros);
            console.log(data.registrosPaginados.registros);
            console.log(data);
        })
        .catch((error)=>{
            console.log(error);
        });
    };
    const handleEliminarRegistro = (registroId) => {
        if (window.confirm("¿Seguro que deseas eliminar este registro de asistencia?")) {
            setRegistros(prev => prev.filter(r => r.id !== registroId));
        }
    };

    if (cargando) {
        return <Typography sx={{ p: 3 }}>Cargando información del evento...</Typography>;
    }

    if (!evento) {
        return <Typography sx={{ p: 3 }} color="error">No se encontró el evento solicitado.</Typography>;
    }
    return (
        <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
            {/* Botón Volver */}
            <Button 
                startIcon={<ArrowBackIcon />} 
                onClick={() => navigate(-1)} 
                sx={{ mb: 2 }}
            >
                Volver al listado
            </Button>

            {/* Ficha de Información del Evento */}
            <Paper sx={{ p: 3, mb: 4, borderRadius: 2, boxShadow: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom style={{ fontWeight: 600 }}>
                    {evento.nombre}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ textTransform: 'capitalize', mb: 2 }}>
                    Categoría / Tipo: <strong>{evento.tipo || 'Otro'}</strong>
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="body1">
                            <strong>Descripción:</strong> {evento.descripcion || 'Sin descripción disponible.'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ borderLeft: { md: '1px solid #e0e0e0' }, pl: { md: 3 } }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Fecha Inicio:</strong> {evento.fechaInicio ? new Date(evento.fechaInicio).toLocaleString('es-AR') : 'No definida'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            <strong>Fecha Fin:</strong> {evento.fechaFin ? new Date(evento.fechaFin).toLocaleString('es-AR') : 'No definida'}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {/* Sección de Registros Asociados */}
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }}>
                Registros de Asistencia Vinculados
            </Typography>

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
        </Box>
    );
};