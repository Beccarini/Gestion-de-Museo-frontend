import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import { AltaRegistro } from '../components/registro/AltaRegistro';
import { MostrarBaja } from '../components/registro/MostrarBaja';
import { getRegistros, deleteRegistro, postRegistro } from '../services/registrosService';
export function GestionRegistro() {
    const [allRegistros, setAllRegistros] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    function obtenerRegistros() {
        getRegistros()
            .then((data) => {
                setAllRegistros(data.registros || []);
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        obtenerRegistros();
    }, []);

    function nuevoRegistro(registro) {
        postRegistro(registro)
            .then(() => {
                obtenerRegistros();
            }).catch((error) => {
                console.log(error);
            });
    }
    function borrarRegistro(id){
        deleteRegistro(id)
        .then(()=>{
            obtenerRegistros()
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
                    Gestión de Registros
                </Typography>
                
                {/* Botón que abre el modal */}
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Nuevo Registro
                </Button>
            </Box>
            
            {/* --- SECCIÓN DE ALTA (MODAL) --- */}
            <AltaRegistro 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                nuevoRegistro={nuevoRegistro} 
            />
            
            {/* --- SECCIÓN DE BAJA (LISTADO) --- */}
            <MostrarBaja 
                registros={allRegistros} 
                setRegistros={setAllRegistros}
                deleteRegistro={borrarRegistro}
            />
        </Box>
    );
}