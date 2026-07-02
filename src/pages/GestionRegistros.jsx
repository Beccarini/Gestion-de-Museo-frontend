import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add'; 
import { AltaRegistro } from '../components/registro/AltaRegistro';
import { MostrarBaja } from '../components/registro/MostrarBaja';
import { getRegistros, deleteRegistro, postRegistro } from '../services/registrosService';
import { FiltrosRegistros } from '../components/registro/FiltrosRegistros';
export function GestionRegistro() {
    const [allRegistros, setAllRegistros] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [esAsistencia, setEsAsistencia] = useState('');
    const [esApertura, setEsApertura] = useState('');
    function obtenerRegistros() {
        setCargando(true);
        getRegistros({
            pagina,
            fechaInicio,
            fechaFin,
            esAsistencia,
            esApertura
        })
        .then((data) => {
            // Revisa qué nombre de variable devuelve tu backend para las paginaciones, 
            // asumo 'registros' y 'totalPaginas' basándome en tu backend
            setAllRegistros(data.registros || data.data || []); 
            setTotalPaginas(data.totalPaginas || data.totalPages || 1);
        })
        .catch((error) => {
            console.error("Error obteniendo registros:", error);
        })
        .finally(() => {
            setCargando(false);
        });
    }
    useEffect(() => {
        obtenerRegistros();
    }, [pagina, fechaInicio, fechaFin, esAsistencia, esApertura]);
    useEffect(() => {
        setPagina(1);
    }, [fechaInicio, fechaFin, esAsistencia, esApertura]);

    function nuevoRegistro(registro) {
        postRegistro(registro)
            .then(() => {
                obtenerRegistros();
            }).catch((error) => {
                console.error(error);
            });
    }

    function borrarRegistro(id) {
        if (window.confirm('¿Estás seguro de eliminar el registro?')) {
            deleteRegistro(id)
                .then(() => {
                    obtenerRegistros();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }

    const handlePageChange = (newPage) => {
        setPagina(newPage);
    };
    return (
        <Box sx={{ p: 4, maxWidth: 1200, margin: '0 auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" gutterBottom sx={{ mb: 0 }}>
                    Gestión de Registros
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                >
                    Nuevo Registro
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
                onChangePagina={handlePageChange}
            />
        </Box>
    );
}