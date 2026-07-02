import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import { AltaRegistro } from '../components/registro/AltaRegistro';
import { MostrarBaja } from '../components/registro/MostrarBaja';
import { getRegistros, deleteRegistro, postRegistro } from '../services/registrosService';
import { FiltrosRegistros } from '../components/registro/FiltrosRegistros';
import { getIntegranteById } from '../services/integranteService';
import { getEventoById } from '../services/eventoService';

export function GestionRegistro() {
    const [allRegistros, setAllRegistros] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Estados de paginación y filtros
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [esAsistencia, setEsAsistencia] = useState('');
    const [esApertura, setEsApertura] = useState('');

    const obtenerRegistros = async () => {
        setCargando(true);
        try {
            // 1. Pedimos datos paginados y filtrados
            const data = await getRegistros({
                pagina,
                fechaInicio,
                fechaFin,
                esAsistencia,
                esApertura
            });

            const registrosRaw = data.registros || data.data || [];
            setTotalPaginas(data.totalPaginas || data.totalPages || 1);

            // 2. Buscamos nombres para cada registro
            const registrosConNombres = await Promise.all(
                registrosRaw.map(async (reg) => {
                    let integranteData = null;
                    let eventoData = null;

                    if (reg.integranteId) {
                        try {
                            integranteData = await getIntegranteById(reg.integranteId);
                        } catch (err) { console.warn(`Error integrante ${reg.integranteId}`); }
                    }
                    if (reg.eventoId) {
                        try {
                            eventoData = await getEventoById(reg.eventoId);
                        } catch (err) { console.warn(`Error evento ${reg.eventoId}`); }
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
            console.error("Error al obtener registros:", error);
        } finally {
            setCargando(false);
        }
    };

    // Efecto para cambios en filtros/pág
    useEffect(() => {
        obtenerRegistros();
    }, [pagina, fechaInicio, fechaFin, esAsistencia, esApertura]);

    // Resetear a página 1 al cambiar filtros
    useEffect(() => {
        setPagina(1);
    }, [fechaInicio, fechaFin, esAsistencia, esApertura]);

    function nuevoRegistro(registro) {
        postRegistro(registro).then(() => obtenerRegistros());
    }

    function borrarRegistro(id) {
        if (window.confirm('¿Estás seguro de eliminar el registro?')) {
            deleteRegistro(id).then(() => obtenerRegistros());
        }
    }

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                    Gestión de Registros
                </Typography>
                <Button 
                    variant="contained" color="primary" startIcon={<AddIcon />} 
                    onClick={() => setIsModalOpen(true)}
                >
                    NUEVO REGISTRO
                </Button>
            </Box>

            <FiltrosRegistros 
                fechaInicio={fechaInicio} setFechaInicio={setFechaInicio}
                fechaFin={fechaFin} setFechaFin={setFechaFin}
                esAsistencia={esAsistencia} setEsAsistencia={setEsAsistencia}
                esApertura={esApertura} setEsApertura={setEsApertura}
            />

            <AltaRegistro 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                nuevoRegistro={nuevoRegistro} 
            />

            <MostrarBaja 
                registros={allRegistros} 
                cargando={cargando}
                deleteRegistro={borrarRegistro}
                paginaActual={pagina}
                totalPaginas={totalPaginas}
                onChangePagina={setPagina}
            />
        </Box>
    );
}