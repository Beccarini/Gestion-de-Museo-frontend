    import React, { useState, useEffect } from 'react';
    import { Button, Box, Typography } from '@mui/material';
    import AddIcon from '@mui/icons-material/Add';
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
                        obtenerEventos(); 
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
                        obtenerEventos();
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
            <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                            Gestión de Eventos
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAbrirAlta}
                        sx={{ 
                            borderRadius: '8px', fontWeight: 600, px: 3, py: 1, boxShadow: '0 4px 10px rgba(26, 115, 232, 0.3)',
                            transition: 'all 0.2s', '&:hover': { boxShadow: '0 6px 15px rgba(26, 115, 232, 0.4)', transform: 'translateY(-2px)' }
                        }}
                    >
                        NUEVO EVENTO
                    </Button>
                </Box>
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