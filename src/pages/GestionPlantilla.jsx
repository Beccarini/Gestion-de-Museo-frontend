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
        if (window.confirm('¿Estás seguro de eliminar la plantilla?')){
            deletePlantilla(id)
                .then(() => {
                    obtenerPlantillas();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>

                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                        Programación de Eventos
                    </Typography>
                </Box>
                <Button 
                    variant="contained" color="primary" startIcon={<AddIcon />} onClick={abrirModalNuevo}
                    sx={{ 
                        borderRadius: '8px', fontWeight: 600, px: 3, py: 1, boxShadow: '0 4px 10px rgba(26, 115, 232, 0.3)',
                        transition: 'all 0.2s', '&:hover': { boxShadow: '0 6px 15px rgba(26, 115, 232, 0.4)', transform: 'translateY(-2px)' }
                    }}
                >
                    NUEVO EVENTO PROGRAMADO
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