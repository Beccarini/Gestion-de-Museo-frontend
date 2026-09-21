import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Box, Typography, Button, Pagination, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TablaProyectos from '../components/gestionProyectos/TablaProyectos';
import FormularioProyecto from '../components/gestionProyectos/FormularioProyecto';
import FiltrosProyectos from '../components/gestionProyectos/FiltrosProyectos';
import VerIntegrantesProyecto from '../components/gestionProyectos/VerIntegrantesProyecto';
import AsignarIntegranteAProyecto from '../components/gestionProyectos/AsignarIntegrantesProyecto';

import { getProyectos, crearProyecto, actualizarProyecto, eliminarProyecto, asignarIntegranteAProyecto } from '../services/proyectoService';

const GestionProyectos = () => {
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [proyectoAEditar, setProyectoAEditar] = useState(null);
    const [openModalIntegrantes, setOpenModalIntegrantes] = useState(false);
    const [proyectoParaVer, setProyectoParaVer] = useState(null);
    const [openModalAsignar, setOpenModalAsignar] = useState(false);
    const [proyectoParaAsignar, setProyectoParaAsignar] = useState(null);
    
    const [error, setError] = useState(null);

    const cargarProyectos = async () => {
        try {
            const data = await getProyectos(page, 10, filtroNombre, filtroEstado);
            setProyectos(data.proyectos);
            setTotalPages(data.totalPaginas);
        } catch (err) {
            setError('Error al cargar la lista de proyectos.');
        }
    };

    useEffect(() => {
        cargarProyectos();
    }, [page, filtroNombre, filtroEstado]);

    const handleLimpiarFiltros = () => {
        setFiltroNombre('');
        setFiltroEstado('');
        setPage(1);
    };

    const handleOpenNuevo = () => {
        setProyectoAEditar(null);
        setOpenModal(true);
    };

    const handleOpenEditar = (proyecto) => {
        setProyectoAEditar(proyecto);
        setOpenModal(true);
    };

    const handleOpenVerIntegrantes = (proyecto) => {
        setProyectoParaVer(proyecto);
        setOpenModalIntegrantes(true);
    };

    const handleOpenAsignarIntegrantes = (proyecto) => {
        setProyectoParaAsignar(proyecto);
        setOpenModalAsignar(true);
    };

    const handleGuardar = async (proyectoData) => {
        try {
            if (proyectoAEditar) {
                await actualizarProyecto(proyectoAEditar.id, proyectoData);
            } else {
                await crearProyecto(proyectoData);
            }
            setOpenModal(false);
            cargarProyectos();
        } catch (err) {
            setError('Error al guardar el proyecto.');
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este proyecto? Esta acción no se puede deshacer.')) {
            try {
                await eliminarProyecto(id);
                setPage(1); 
                cargarProyectos();
            } catch (err) {
                setError('Error al eliminar el proyecto.');
            }
        }
    };

    const handleVerPerfil = (id) => {
        navigate(`/proyectos/${id}`);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                        Gestión de Proyectos
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleOpenNuevo}
                    sx={{ 
                        borderRadius: '8px', 
                        fontWeight: 600, 
                        px: 3,
                        py: 1,
                        boxShadow: '0 4px 10px rgba(26, 115, 232, 0.3)',
                        transition: 'all 0.2s',
                        '&:hover': { 
                            boxShadow: '0 6px 15px rgba(26, 115, 232, 0.4)', 
                            transform: 'translateY(-2px)' 
                        }
                    }}
                >
                    NUEVO PROYECTO
                </Button>
            </Box>

            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <FiltrosProyectos 
                filtroNombre={filtroNombre}
                setFiltroNombre={setFiltroNombre}
                filtroEstado={filtroEstado}
                setFiltroEstado={setFiltroEstado}
                onLimpiar={handleLimpiarFiltros}
            />

            <TablaProyectos 
                proyectos={proyectos} 
                onEdit={handleOpenEditar} 
                onDelete={handleEliminar}
                onVerIntegrantes={handleOpenVerIntegrantes}
                onAsignarIntegrantes={handleOpenAsignarIntegrantes}
                onVerPerfil={handleVerPerfil}
            />

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                        count={totalPages} 
                        page={page} 
                        onChange={(e, value) => setPage(value)} 
                        color="primary" 
                    />
                </Box>
            )}

            <FormularioProyecto 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                proyectoAEditar={proyectoAEditar}
                onGuardar={handleGuardar}
            />

            <VerIntegrantesProyecto 
                open={openModalIntegrantes}
                onClose={() => setOpenModalIntegrantes(false)}
                proyecto={proyectoParaVer}
            />

            <AsignarIntegranteAProyecto 
                open={openModalAsignar}
                onClose={() => setOpenModalAsignar(false)}
                proyecto={proyectoParaAsignar}
            />
        </Box>
    );
};

export default GestionProyectos;