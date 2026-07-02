import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import { AltaPlantilla } from '../components/gestionPlantilla/AltaPlantilla';
import { MostrarPlantillas } from '../components/gestionPlantilla/MostrarPlantillas';
import { FiltrosPlantillas } from '../components/gestionPlantilla/FiltrosPlantillas'; // Importamos los filtros
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
    const [frecuencia, setFrecuencia] = useState('');
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [tipo, setTipo] = useState('');
    const [diaSemana, setDiaSemana] = useState('');
    const [activo, setActivo] = useState('');

    function obtenerPlantillas() {
    getPlantillas({ pagina, tipo, diaSemana, frecuencia, activo })
        .then((data) => {
            console.log('DATA RECIBIDA:', data); 
            setAllPlantillas(data.plantillas || []); 
            setTotalPaginas(data.totalPaginas || 1);
        }).catch((error) => {
            console.error("Error al obtener plantillas:", error);
        });
}
    useEffect(() => {
        obtenerPlantillas();
    }, [pagina, tipo, diaSemana, frecuencia, activo]);
    useEffect(() => {
        setPagina(1);
    }, [tipo, diaSemana, frecuencia, activo]);

    function guardarPlantilla(plantilla, isEdit = false, id = null) {
        const peticion = isEdit ? updatePlantilla(id, plantilla) : createPlantilla(plantilla);
        peticion
            .then(() => {
                obtenerPlantillas();
                setIsModalOpen(false); // Cerramos el modal tras guardar exitosamente
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

    const handlePageChange = (newPage) => {
        setPagina(newPage);
    };
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
            <FiltrosPlantillas 
                tipo={tipo} setTipo={setTipo}
                diaSemana={diaSemana} setDiaSemana={setDiaSemana}
                frecuencia={frecuencia} setFrecuencia={setFrecuencia} // <--- ¡Aquí!
                activo={activo} setActivo={setActivo}
            />
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
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onChangePagina={handlePageChange}
            />
        </Box>
    );
}