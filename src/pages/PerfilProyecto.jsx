import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MostrarProyecto } from "../components/perfilProyectos/MostrarProyecto";
import { SeccionIntegrantes } from "../components/perfilProyectos/SeccionIntegrantes";
import { SeccionItems } from "../components/perfilProyectos/SeccionItems";
import FormularioProyecto from "../components/gestionProyectos/FormularioProyecto";
import AsignarIntegrantesProyecto from "../components/gestionProyectos/AsignarIntegrantesProyecto";

import { 
    getProyectoById, 
    eliminarProyecto, 
    actualizarProyecto, 
    getIntegrantesPorProyecto,
    desvincularIntegranteProyecto
} from '../services/proyectoService'; 

export function PerfilProyecto() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [proyecto, setProyecto] = useState(null);
    const [integrantes, setIntegrantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);
    const [modalAsignarAbierto, setModalAsignarAbierto] = useState(false); 

    useEffect(() => {
        if (id) {
            cargarDatos();
        }
    }, [id]);

    const cargarDatos = async () => {
        try {
            const dataProyecto = await getProyectoById(id);
            setProyecto(dataProyecto);

            const dataIntegrantes = await getIntegrantesPorProyecto(id);
            setIntegrantes(dataIntegrantes || []);
            
            setCargando(false);
        } catch (error) {
            console.error("Error al cargar el proyecto:", error);
            setCargando(false);
        }
    };

    const handleGuardarEdicion = async (datosEditados) => {
        try {
            const proyectoActualizado = await actualizarProyecto(id, datosEditados);
            setProyecto(proyectoActualizado);
            setModalEdicionAbierto(false);
        } catch (error) {
            console.error("Error al actualizar el proyecto:", error);
            alert("Hubo un error al actualizar el proyecto en el servidor.");
        }
    };

    const handleEliminarProyecto = async () => {
        if (window.confirm("¿Estás seguro de que deseás eliminar este proyecto de forma permanente?")) {
            try {
                await eliminarProyecto(id);
                navigate('/proyectos'); 
            } catch (error) {
                console.error("Error al eliminar el proyecto:", error);
                alert("Hubo un error al intentar eliminar el proyecto. Verificá si tiene dependencias.");
            }
        }
    };

    const handleDesvincularIntegrante = async (integranteId) => {
        if (window.confirm("¿Desvincular integrante del proyecto?")) {
            try {
                await desvincularIntegranteProyecto(id, integranteId);
                setIntegrantes(integrantes.filter(int => int.id !== integranteId));
                // Éxito silencioso: desaparece de la lista instantáneamente
            } catch (error) {
                console.error("Error al desvincular integrante:", error);
                alert("Hubo un error al intentar desvincular al integrante.");
            }
        }
    };

    const handleAsignacionExitosa = async () => {
        try {
            const dataIntegrantes = await getIntegrantesPorProyecto(id);
            setIntegrantes(dataIntegrantes || []);
        } catch (error) {
            console.error("Error al refrescar la lista de integrantes:", error);
        }
    };

    const handleVerIntegrante = (integranteId) => {
        navigate(`/integrantes/${integranteId}`); 
    };

    if (cargando) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Cargando información del proyecto...</Typography>
            </Box>
        );
    }

    if (!proyecto) {
        return <Typography sx={{ p: 3 }} color="error">No se encontró el proyecto.</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 2, mb: 5 }}>
            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/proyectos`} sx={{ mb: 2 }} size="small">
                Volver al listado
            </Button>

            <MostrarProyecto 
                proyecto={proyecto} 
                onEditar={() => setModalEdicionAbierto(true)} 
                onEliminar={handleEliminarProyecto}
            />

            <SeccionIntegrantes 
                integrantes={integrantes}
                onAbrirAsignar={() => setModalAsignarAbierto(true)} 
                onDesvincular={handleDesvincularIntegrante}
                onVerIntegrante={handleVerIntegrante}
            />

            <SeccionItems />

            <FormularioProyecto 
                open={modalEdicionAbierto}
                onClose={() => setModalEdicionAbierto(false)}
                proyectoAEditar={proyecto}
                onGuardar={handleGuardarEdicion}
            />

            <AsignarIntegrantesProyecto 
                open={modalAsignarAbierto}
                onClose={() => setModalAsignarAbierto(false)}
                proyecto={proyecto}
                onAsignacionExitosa={handleAsignacionExitosa} 
            />
        </Box>
    );
}