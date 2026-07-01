import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import { AltaPlantilla } from '../components/gestionPlantilla/AltaPlantilla';
import { MostrarPlantillas } from '../components/gestionPlantilla/MostrarPlantillas';
import { 
    getPlantillas, 
    deletePlantilla, 
    createPlantilla, 
    updatePlantilla,
    togglePlantillaEstado 
} from '../services/plantillaService';

export function GestionPlantilla() {
    const [allPlantillas, setAllPlantillas] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(null);

    function obtenerPlantillas() {
        getPlantillas()
            .then((data) => {
                setAllPlantillas(data || []);
            }).catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        obtenerPlantillas();
    }, []);

    // Sirve tanto para crear como para editar
    function guardarPlantilla(plantilla, isEdit = false, id = null) {
        const peticion = isEdit ? updatePlantilla(id, plantilla) : createPlantilla(plantilla);
        
        peticion
            .then(() => {
                obtenerPlantillas();
            }).catch((error) => {
                console.log(error);
            });
    }

    function borrarPlantilla(id) {
        deletePlantilla(id)
            .then(() => {
                obtenerPlantillas();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function alternarEstado(id) {
        togglePlantillaEstado(id)
            .then(() => {
                obtenerPlantillas();
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function abrirModalEdicion(plantilla) {
        setPlantillaSeleccionada(plantilla);
        setIsModalOpen(true);
    }

    function abrirModalNuevo() {
        setPlantillaSeleccionada(null);
        setIsModalOpen(true);
    }

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
                    Gestión de Plantillas
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={abrirModalNuevo}
                >
                    Nueva Plantilla
                </Button>
            </Box>

            <AltaPlantilla 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                guardarPlantilla={guardarPlantilla} 
                plantillaEdit={plantillaSeleccionada}
            />

            <MostrarPlantillas 
                plantillas={allPlantillas} 
                deletePlantilla={borrarPlantilla}
                toggleEstado={alternarEstado}
                editarPlantilla={abrirModalEdicion}
            />
        </Box>
    );
}