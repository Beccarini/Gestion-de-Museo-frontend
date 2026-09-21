import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getAllRecursos, addRecurso, updateRecurso } from '../services/recursoService';
import { AltaModificacionRecursos } from "../components/perfilRecursos/AltaModificacionRecursos";
import { Filtros } from '../components/perfilRecursos/Filtros';
import { MostrarRecursos } from "../components/perfilRecursos/MostrarRecursos";

export function GestionRecurso() {
    const [error, setError]=useState(null);
    const [recursos,setRecursos]=useState([]);
    const [recursoAEditar, setRecursoAEditar]=useState([]);
    const [page, setPage]=useState(1);
    const [filtroNombre, setFiltroNombre]=useState('');
    const [filtroCategoria, setFiltroCategoria]=useState('');
    const obtenerRecursos=async()=>{
        try{
            const obtenerRecursosDelBack=await getAllRecursos({
                page: page,
                nombre: filtroNombre,
                categoria: filtroCategoria
            });
            setRecursos(obtenerRecursosDelBack.recursos);
            console.log(obtenerRecursosDelBack.recursos);
        }catch(err){
            setError(err);
        }
    };
    useEffect(()=>{
        obtenerRecursos();
    },[page, filtroCategoria, filtroNombre]);
    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>Inventario</Typography>
            <MostrarRecursos 
                recursos={recursos} 
                setRecursoAEditar={setRecursoAEditar} 
                onReload={obtenerRecursos} 
            />
        </Box>
    );
}