import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Box, Typography, Button, CircularProgress, Alert } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MostrarPermiso from '../components/perfilPermisos/MostrarPermiso';
import SeccionIntegrantes from '../components/perfilPermisos/SeccionIntegrantes'; 
import FormularioPermiso from '../components/gestionPermisos/FormularioPermiso';
import AsignarMasivo from '../components/gestionPermisos/AsignarMasivo';

import { 
    getPermisoById, 
    actualizarPermiso, 
    eliminarPermiso,
    getIntegrantesPorPermiso
} from '../services/permisoService';
import { desvincularPermiso } from '../services/integranteService';

const PerfilPermiso = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [permiso, setPermiso] = useState(null);
    const [integrantes, setIntegrantes] = useState([]);    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModalEditar, setOpenModalEditar] = useState(false);
    const [openModalAsignar, setOpenModalAsignar] = useState(false);

    const cargarDatosPermiso = async () => {
        setLoading(true);
        setError(null);
        try {
            const [dataPermiso, dataIntegrantes] = await Promise.all([
                getPermisoById(id),
                getIntegrantesPorPermiso(id)
            ]);
            
            setPermiso(dataPermiso);
            setIntegrantes(dataIntegrantes?.integrantes || dataIntegrantes || []);
        } catch (err) {
            console.error("Error al cargar el perfil:", err);
            setError("No se pudo cargar el perfil del permiso.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) cargarDatosPermiso();
    }, [id]);

    const handleGuardarEdicion = async (datosEditados) => {
        try {
            await actualizarPermiso(id, datosEditados);
            setOpenModalEditar(false);
            cargarDatosPermiso(); 
        } catch (err) {
            console.error("Error al actualizar:", err);
            alert("No se pudo actualizar el permiso.");
        }
    };

    const handleEliminarPermiso = async () => {
        if (!window.confirm("¿Estás seguro de eliminar este permiso definitivamente?")) return;
        try {
            await eliminarPermiso(id);
            navigate('/permisos'); 
        } catch (err) {
            console.error("Error al eliminar:", err);
            alert("Hubo un error al intentar eliminar el permiso.");
        }
    };

    const handleDesvincularIntegrante = async (integranteId) => {
        if (!window.confirm("¿Desvincular a este integrante del permiso?")) return;
        try {
            await desvincularPermiso(integranteId, id);
            cargarDatosPermiso(); 
        } catch (err) {
            console.error("Error al desvincular:", err);
            alert("Hubo un error al intentar desvincular al integrante.");
        }
    };

    if (loading) return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
            <CircularProgress />
            <Typography sx={{ mt: 2 }} color="text.secondary">Cargando...</Typography>
        </Box>
    );

    return (
        <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 2, mb: 5 }}>
            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/permisos`} sx={{ mb: 2 }} size="small">
                Volver al listado
            </Button>

            {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

            {permiso && (
                <>
                    <MostrarPermiso 
                        permiso={permiso} 
                        onAbrirEditar={() => setOpenModalEditar(true)} 
                        onEliminar={handleEliminarPermiso} 
                    />

                    <SeccionIntegrantes 
                        integrantes={integrantes}
                        onAbrirAsignar={() => setOpenModalAsignar(true)}
                        onDesvincular={handleDesvincularIntegrante}
                        onVerIntegrante={(iId) => navigate(`/integrantes/${iId}`)}
                    />
                </>
            )}

            <FormularioPermiso 
                open={openModalEditar} 
                onClose={() => setOpenModalEditar(false)} 
                permisoAEditar={permiso}
                onGuardar={handleGuardarEdicion}
            />

            <AsignarMasivo
                open={openModalAsignar}
                onClose={() => setOpenModalAsignar(false)}
                permisoSeleccionado={permiso}
                onAsignacionExitosa={cargarDatosPermiso} 
            />
        </Box>
    );
};

export default PerfilPermiso;