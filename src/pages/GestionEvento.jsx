// src/pages/GestionEvento.jsx
import React, { useState, useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { AltaEvento } from '../components/gestionEventos/AltaEvento';
import { MostrarEvento } from '../components/gestionEventos/MostrarEvento';
import { getEventos, createEvento, deleteEvento, updateEvento } from '../services/eventoService';

export function GestionEventos() {
    const [allEventos, setAllEventos] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventoAEditar, setEventoAEditar] = useState(null);
    function obtenerEventos() {
        getEventos()
            .then((data) => {
                // Adaptamos la respuesta convirtiendo las fechas ISO/String que vienen de la API a objetos Date reales
                const eventosFormateados = (data.eventos || data || []).map(ev => ({
                    ...ev,
                    fechaInicio: ev.fechaInicio ? new Date(ev.fechaInicio) : null,
                    fechaFin: ev.fechaFin ? new Date(ev.fechaFin) : null,
                }));
                setAllEventos(eventosFormateados);
            })
            .catch((error) => {
                console.error("Error al buscar eventos:", error);
            });
    }
    useEffect(() => {
        obtenerEventos();
    }, []);

    function manejarGuardarEvento(eventoData) {
        if (eventoAEditar) {
            updateEvento(eventoAEditar.id, eventoData)
                .then(() => {
                    obtenerEventos(); // Refrescar tabla
                    handleCloseModal();
                })
                .catch((error) => {
                    console.error("Error al actualizar evento:", error);
                });
        } else {
            createEvento(eventoData)
                .then(() => {
                    obtenerEventos();
                    handleCloseModal();
                })
                .catch((error) => {
                    console.error("Error al crear evento:", error);
                });
        }
    }

    function borrarEvento(id) {
        if (window.confirm("¿Seguro que deseas eliminar este evento?")) {
            deleteEvento(id)
                .then(() => {
                    obtenerEventos(); // Refrescar tabla
                })
                .catch((error) => {
                    console.error("Error al eliminar evento:", error);
                });
        }
    }
    const handleAbrirAlta = () => {
        setEventoAEditar(null);
        setModalOpen(true);
    };

    const handleAbrirEditar = (evento) => {
        setEventoAEditar(evento);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEventoAEditar(null);
    };
    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                Gestión de Eventos
            </Typography>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAbrirAlta} 
                sx={{ mb: 3 }}
            >
                Registrar Nuevo Evento
            </Button>
            <MostrarEvento 
                eventos={allEventos} 
                deleteEvento={borrarEvento} 
                onEditar={handleAbrirEditar}
            />
            <AltaEvento 
                open={modalOpen} 
                onClose={handleCloseModal} 
                nuevoEvento={manejarGuardarEvento}
                eventoAEditar={eventoAEditar} 
            />
        </Box>
    );
}