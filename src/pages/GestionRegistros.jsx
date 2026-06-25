import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AltaRegistro } from '../components/AltaRegistro';
import { MostrarBaja } from '../components/MostrarBaja';
import {getRegistros, getRegistroById, deleteRegistro, postRegistro}from '../services/registrosService';
import dayjs from 'dayjs';

export function GestionRegistro() {
    const [allRegistros,setAllRegistros]=useState([]);
    const [registroById,setRegistroById]=useState({});
    function obtenerRegistros(){
        getRegistros()
        .then((data)=>{
            setAllRegistros(data.registros || []);
        }).catch((error)=>{
            console.log(error);
        });
    };
    useEffect(()=>{
        obtenerRegistros();
    },[])
    const getRegistroById=(id)=>{
        obtenerRegistros();
        setRegistroById(allRegistros.filter((registro)=>{id==registro.id}));
    }
    function nuevoRegistro(registro){
        postRegistro(registro)
        .then(()=>{
            obtenerRegistros();
        }).catch((error)=>{
            console.log(error);
        })
    }
    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>
                Gestión de Registros (Alta y Baja)
            </Typography>
            
            {/* --- SECCIÓN DE ALTA --- */}
            <AltaRegistro nuevoRegistro={nuevoRegistro}/>
            
            {/* --- SECCIÓN DE BAJA (LISTADO) --- */}
            <MostrarBaja registros={allRegistros} setRegistros={setAllRegistros}/>
        </Box>
    );
}