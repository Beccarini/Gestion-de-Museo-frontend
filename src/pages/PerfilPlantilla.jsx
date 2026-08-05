import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { MostrarPlantilla } from "../components/perfilPlantillas/MostrarPlantilla";
import { SeccionEventos } from "../components/perfilPlantillas/SeccionEventos";
import { AltaPlantilla } from "../components/gestionPlantilla/AltaPlantilla";

import { 
    getPlantillaById, 
    deletePlantilla, 
    getEventosByPlantilla, 
    togglePlantillaEstado,
    updatePlantilla 
} from '../services/plantillaService';

export function PerfilPlantilla() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [plantilla, setPlantilla] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [cargando, setCargando] = useState(true);
    
    const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            setCargando(true);
            try {
                const dataPlantilla = await getPlantillaById(id);
                setPlantilla(dataPlantilla);

                try {
                    const dataEventos = await getEventosByPlantilla(id);
                    const listaEventos = Array.isArray(dataEventos) ? dataEventos : (dataEventos.eventos || dataEventos.data || []);
                    setEventos(listaEventos);
                } catch (errorEventos) {
                    setEventos([]);
                }

            } catch (error) {
                console.error("Error al cargar la plantilla:", error);
            } finally {
                setCargando(false);
            }
        };

        if (id) {
            cargarDatos();
        }
    }, [id]);

    const handleEliminarPlantilla = async () => {
        if (window.confirm("¿Estás seguro de eliminar esta plantilla de forma permanente?")) {
            try {
                await deletePlantilla(id);
                navigate('/plantillas');
            } catch (error) {
                console.error("Error al eliminar la plantilla:", error);
                alert("Hubo un error al intentar eliminar la plantilla.");
            }
        }
    };

    const handleToggleEstado = async () => {
        try {
            await togglePlantillaEstado(id);
            setPlantilla({ ...plantilla, activo: !plantilla.activo });
        } catch (error) {
            console.error("Error al cambiar el estado:", error);
            alert("Hubo un error al intentar cambiar el estado de la plantilla.");
        }
    };

    const handleGuardarEdicion = async (datosEditados) => {
        try {
            const plantillaActualizada = await updatePlantilla(id, datosEditados);
            setPlantilla(plantillaActualizada); // Actualizamos la UI
            setModalEdicionAbierto(false);      // Cerramos el modal
        } catch (error) {
            console.error("Error al editar la plantilla:", error);
            alert("Hubo un error al intentar actualizar la plantilla.");
        }
    };

    const handleVerEvento = (eventoId) => {
        navigate(`/eventos/${eventoId}`);
    };

    if (cargando) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Obteniendo información del servidor...</Typography>
            </Box>
        );
    }

    if (!plantilla) {
        return <Typography sx={{ p: 3 }} color="error">No se encontró la plantilla solicitada.</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 2, mb: 5 }}>
            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/plantillas`} sx={{ mb: 2 }} size="small">
                Volver al listado
            </Button>

            <MostrarPlantilla 
                plantilla={plantilla} 
                onEditar={() => setModalEdicionAbierto(true)} // Abrimos modal
                onEliminar={handleEliminarPlantilla}
                onToggleEstado={handleToggleEstado}
            />

            <SeccionEventos 
                eventos={eventos}
                onVerEvento={handleVerEvento}
            />

            <AltaPlantilla 
                open={modalEdicionAbierto}
                onClose={() => setModalEdicionAbierto(false)}
                plantillaEdit={plantilla}
                guardarPlantilla={handleGuardarEdicion}
            />
        </Box>
    );
}