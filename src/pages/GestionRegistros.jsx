import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import { AltaRegistro } from '../components/registro/AltaRegistro';
import { MostrarBaja } from '../components/registro/MostrarBaja';
import { getRegistros, deleteRegistro, postRegistro } from '../services/registrosService';
import { getIntegranteById } from '../services/integranteService';
import { getEventoById } from '../services/eventoService';

export function GestionRegistro() {
    const [allRegistros, setAllRegistros] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

const obtenerRegistros = async () => {
    try {
        const data = await getRegistros();
        const registrosRaw = data.registros || [];

        const registrosConNombres = await Promise.all(
            registrosRaw.map(async (reg) => {
                let integranteData = null;
                let eventoData = null;

                if (reg.integranteId) {
                    try {
                        integranteData = await getIntegranteById(reg.integranteId);
                    } catch (err) {
                        console.warn(`No se encontró el integrante ${reg.integranteId}`);
                    }
                }

                if (reg.eventoId) {
                    try {
                        eventoData = await getEventoById(reg.eventoId);
                    } catch (err) {
                        console.warn(`No se encontró el evento ${reg.eventoId}`);
                    }
                }

                return {
                    ...reg,
                    Integrante: integranteData || null,
                    Evento: eventoData || null
                };
            })
        );
        setAllRegistros(registrosConNombres);
        
    } catch (error) {
        console.error("Error al buscar registros:", error);
    }
};

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
        if (window.confirm('¿Estás seguro de eliminar el registro?')){
            deleteRegistro(id)
            .then(()=>{
                obtenerRegistros()
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }
    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                        Gestión de Registros
                    </Typography>
                </Box>
                <Button 
                    variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setIsModalOpen(true)}
                    sx={{ 
                        borderRadius: '8px', fontWeight: 600, px: 3, py: 1, boxShadow: '0 4px 10px rgba(26, 115, 232, 0.3)',
                        transition: 'all 0.2s', '&:hover': { boxShadow: '0 6px 15px rgba(26, 115, 232, 0.4)', transform: 'translateY(-2px)' }
                    }}
                >
                    NUEVO REGISTRO
                </Button>
            </Box>
            <AltaRegistro 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                nuevoRegistro={nuevoRegistro} 
            />
            <MostrarBaja 
                registros={allRegistros} 
                setRegistros={setAllRegistros}
                deleteRegistro={borrarRegistro}
            />
        </Box>
    );
}