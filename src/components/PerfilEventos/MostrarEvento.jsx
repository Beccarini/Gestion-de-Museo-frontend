import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Button, Divider, Grid 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
export function MostrarEvento({evento}){
    return(
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
    );
};