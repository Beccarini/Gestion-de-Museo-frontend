import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Pagination, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SecurityIcon from '@mui/icons-material/Security';
import TablaPermisos from '../components/permisos/TablaPermisos';
import FormularioPermiso from '../components/permisos/FormularioPermiso';
import FiltrosPermisos from '../components/permisos/FiltrosPermisos';
import AsignarMasivo from '../components/permisos/AsignarMasivo';
import VerIntegrantes from '../components/perfilIntegrantes/VerIntegrantes';
import { getPermisos, crearPermiso, actualizarPermiso, eliminarPermiso } from '../services/permisoService';

const GestionPermisos = () => {
    const [permisos, setPermisos] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filtroDia, setFiltroDia] = useState('');    
    const [openModal, setOpenModal] = useState(false);
    const [permisoAEditar, setPermisoAEditar] = useState(null);
    const [error, setError] = useState(null);
    const [openModalMasivo, setOpenModalMasivo] = useState(false);
    const [permisoParaAsignar, setPermisoParaAsignar] = useState(null);
    const [openModalIntegrantes, setOpenModalIntegrantes] = useState(false);
    const [permisoParaVer, setPermisoParaVer] = useState(null);

    const cargarPermisos = async () => {
        try {
            const data = await getPermisos(page, 10, filtroDia);
            setPermisos(data.permisos);
            setTotalPages(data.totalPaginas);
        } catch (err) {
            setError('Error al cargar la lista de permisos.');
        }
    };

    useEffect(() => {
        cargarPermisos();
    }, [page, filtroDia]);

    const handleCambioFiltro = (nuevoDia) => {
        setFiltroDia(nuevoDia);
        setPage(1);
    };

    const handleLimpiarFiltro = () => {
        setFiltroDia('');
        setPage(1);
    };

    const handleOpenNuevo = () => {
        setPermisoAEditar(null);
        setOpenModal(true);
    };

    const handleOpenEditar = (permiso) => {
        setPermisoAEditar(permiso);
        setOpenModal(true);
    };

    const handleGuardar = async (formData) => {
        try {
            setError(null);
            if (permisoAEditar) {
                await actualizarPermiso(permisoAEditar.id, formData);
            } else {
                await crearPermiso(formData);
            }
            setOpenModal(false);
            cargarPermisos();
        } catch (err) {
            setError(err.response?.data?.errors?.[0]?.msg || 'Error al guardar el permiso');
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este permiso? Esto podría afectar a los integrantes que lo tengan asignado.')) {
            try {
                await eliminarPermiso(id);
                setPage(1); 
                cargarPermisos();
            } catch (err) {
                setError('Error al eliminar el permiso.');
            }
        }
    };

    const handleOpenAsignarMasivo = (permiso) => {
        setPermisoParaAsignar(permiso);
        setOpenModalMasivo(true);
    };
    const handleOpenVerIntegrantes = (permiso) => {
        setPermisoParaVer(permiso);
        setOpenModalIntegrantes(true);
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: '1200px', mx: 'auto' }}>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h4" fontWeight="bold">
                        Gestión de Permisos
                    </Typography>
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />}
                    onClick={handleOpenNuevo}
                    sx={{ borderRadius: 2, fontWeight: 'bold' }}
                >
                    Nuevo Permiso
                </Button>
            </Box>

            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <FiltrosPermisos 
                filtroDia={filtroDia}
                setFiltroDia={handleCambioFiltro}
                onLimpiar={handleLimpiarFiltro}
            />

            <TablaPermisos 
                permisos={permisos} 
                onEdit={handleOpenEditar} 
                onDelete={handleEliminar} 
                onAsignarMasivo={handleOpenAsignarMasivo}
                onVerIntegrantes={handleOpenVerIntegrantes}
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

            <FormularioPermiso 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                permisoAEditar={permisoAEditar}
                onGuardar={handleGuardar}
            />

            <AsignarMasivo 
                open={openModalMasivo}
                onClose={() => setOpenModalMasivo(false)}
                permisoSeleccionado={permisoParaAsignar}
                onAsignacionExitosa={() => {
                    alert('¡Permisos asignados con éxito!');
                }}
            />

            <VerIntegrantes 
                open={openModalIntegrantes}
                onClose={() => setOpenModalIntegrantes(false)}
                permisoSeleccionado={permisoParaVer}
            />

        </Box>
    );
};

export default GestionPermisos;