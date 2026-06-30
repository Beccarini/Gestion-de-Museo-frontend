import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { AltaEvento } from '../components/gestionEventos/AltaEvento';
import { MostrarEvento } from '../components/gestionEventos/MostrarEvento';
import { getEventos, deleteEvento, createEvento } from '../services/eventoService';

export function GestionEventos() {
    const [allEventos, setAllEventos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function obtenerEventos() {
        getEventos()
            .then((data) => {
                // Adaptado por si tu API devuelve { eventos: [...] } o directamente el array
                setAllEventos(data.eventos || data || []);
            })
            .catch((error) => {
                console.error("Error al buscar eventos:", error);
            });
    }

    useEffect(() => {
        obtenerEventos();
    }, []);

    function nuevoEvento(evento) {
        createEvento(evento)
            .then(() => {
                obtenerEventos();
            })
            .catch((error) => {
                console.error("Error al crear evento:", error);
            });
    }

    function borrarEvento(id) {
        if (window.confirm("¿Seguro que deseas eliminar este evento?")) { // Validación opcional por seguridad
            deleteEvento(id)
                .then(() => {
                    obtenerEventos();
                })
                .catch((error) => {
                    console.error("Error al eliminar evento:", error);
                });
        }
    }

    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                    Gestión de Eventos
                </Typography>
                
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Nuevo Evento
                </Button>
            </Box>
            
            {/* --- SECCIÓN DE ALTA (MODAL) --- */}
            <AltaEvento 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                nuevoEvento={nuevoEvento} 
            />
            
            {/* --- SECCIÓN DE LISTADO Y BAJA --- */}
            <MostrarEvento 
                eventos={allEventos} 
                deleteEvento={borrarEvento}
            />
        </Box>
    );
}