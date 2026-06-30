import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
    Box, Typography, Paper, Table, TableBody, TableCell, 
    TableContainer, TableHead, TableRow, IconButton, Button, Divider, Grid 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getEventoById, getRegistrosByEvento } from '../services/eventoService';
import { MostrarTablaRegistros } from "../components/PerfilEventos/MostrarTablaRegistros";
import { MostrarEvento } from "../components/PerfilEventos/MostrarEvento";
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
            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/eventos`} sx={{ mb: 2 }}>Volver al listado</Button>

            <MostrarEvento evento={evento}/>

            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 500 }}>Registros de Asistencia Vinculados</Typography>

            <MostrarTablaRegistros handleEliminarRegistro={handleEliminarRegistro} registros={registros}/>
            
        </Box>
    );
};