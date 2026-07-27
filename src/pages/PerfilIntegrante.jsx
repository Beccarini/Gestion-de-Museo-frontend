import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Box, Grid, Alert, CircularProgress, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import CardInfoBasica from '../components/perfilIntegrantes/CardInfoBasica';
import FormularioIntegrante from '../components/FormularioIntegrante'
import TablaUltimosRegistros from '../components/perfilIntegrantes/TablaUltimosRegistros';
import SeccionPermisos from '../components/perfilIntegrantes/SeccionPermisos'
import SeccionProyectos from '../components/perfilIntegrantes/SeccionProyectos';
import AsignarPermisos from '../components/perfilIntegrantes/AsignarPermisos'; 
import AsignarProyectos from '../components/perfilIntegrantes/AsignarProyectos';
import { getIntegranteById, updateIntegrante, 
        getRegistrosByIntegrante, getPermisosByIntegrante,
        getProyectosByIntegrante, desvincularPermiso, 
        desvincularProyecto, toggleEstadoIntegrante
} from '../services/integranteService';
import { getEventoById } from '../services/eventoService';

const PerfilIntegrante = () => {
    const { id } = useParams();
    const [integrante, setIntegrante] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [openModalPermisos, setOpenModalPermisos] = useState(false); 
    const [permisos, setPermisos] = useState(null);
    const [proyectos, setProyectos] = useState(null);
    const [openProyectosModal, setOpenProyectosModal] = useState(false);

    const cargarDatosPerfil = () => {
        setLoading(true);
        setError(null);
        
        Promise.all([
            getIntegranteById(id),
            getRegistrosByIntegrante(id, 1, 5),
            getPermisosByIntegrante(id),
            getProyectosByIntegrante(id)
        ])
        .then(async ([datosIntegrante, datosBackend, datosPermisos, datosProyectos]) => {
            setIntegrante(datosIntegrante);
            setPermisos(datosPermisos.integrante.permisos);
            setProyectos(datosProyectos.integrante.proyectos);
            
            if (datosBackend.registrosPaginados && datosBackend.registrosPaginados.historial) {
                const historialCrudo = datosBackend.registrosPaginados.historial;
                
                const historialConEventos = await Promise.all(
                    historialCrudo.map(async (reg) => {
                        let eventoData = null;
                        
                        if (reg.eventoId) {
                            try {
                                const res = await getEventoById(reg.eventoId);
                                eventoData = res.evento || res.data || res; 
                            } catch (err) {
                                console.warn(`No se encontró el evento ${reg.eventoId}`);
                            }
                        }
                        
                        return {
                            ...reg,
                            Evento: eventoData || null
                        };
                    })
                );
                
                setRegistros(historialConEventos);
            } else {
                setRegistros([]); 
            }

            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("No se pudo cargar el perfil. Verificá la conexión con la API.");
            setLoading(false);
        });
    };

    const handleDesvincularPermiso = async (permisoId, descripcion) => {
        if (window.confirm(`¿Seguro que querés revocar el permiso "${descripcion}" a este integrante?`)) {
            try {
                await desvincularPermiso(id, permisoId);
                cargarDatosPerfil(); 
            } catch (err) {
                console.error("Error al revocar:", err);
                setError("Hubo un error al revocar el permiso.");
            }
        }
    };

    const handleDesvincularProyecto = async (proyectoId) => {
        if (!window.confirm("¿Estás seguro de que deseas desvincular este proyecto de este integrante?")) return;
        
        try {
            await desvincularProyecto(id, proyectoId); 
            cargarDatosPerfil(); 
        } catch (error) {
            console.error("Error al desvincular el proyecto:", error);
            alert("No se pudo desvincular el proyecto.");
        }
    };

    useEffect(() => {
        if (id) {
            cargarDatosPerfil();
        }
    }, [id]);

    const handleActualizarPerfil = (datos) => {
        updateIntegrante(id, datos)
            .then(() => {
                setOpenModal(false);
                cargarDatosPerfil(); 
            })
            .catch((err) => {
                console.error("Error al actualizar:", err);
                setError("No se pudieron guardar los cambios.");
            });
    };

    const handleCambiarEstado = () => {
        toggleEstadoIntegrante(id)
            .then(()=>{
                cargarDatosPerfil();
            })
            .catch((err) =>{
                console.error("Error al cambiar estado:", err);
                setError("No se pudo cambiar el estado del integrante.");
            });
    };

    if (loading) {
        return (
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                width: '100%',            
                py: 10                    
            }}>
                <CircularProgress size={50} />
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Cargando base de datos...
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 2, mb: 5 }}>

            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/integrantes`} sx={{ mb: 2 }} size='small'>
                Volver al listado
            </Button>

            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {integrante && (
                <>
                    <Box sx={{ width: '100%', mb: 3 }}>
                        <CardInfoBasica 
                            integrante={integrante} 
                            onAbrirEditar={() => setOpenModal(true)} 
                            onCambiarEstado={handleCambiarEstado}
                        />
                    </Box>

                    <Box sx={{ width: '100%', mb: 3 }}>
                        <SeccionPermisos 
                            permisosIniciales={permisos} 
                            onAbrirAsignar={() => setOpenModalPermisos(true)} 
                            onDesvincular={handleDesvincularPermiso} 
                        />
                    </Box>
                    
                    <Box sx={{ width: '100%', mb: 3 }}>
                        <SeccionProyectos 
                            proyectosIniciales={proyectos} 
                            onAsignar={() => setOpenProyectosModal(true)} 
                            onDesasignar={handleDesvincularProyecto} 
                        />
                    </Box>

                    <Box sx={{ width: '100%' }}>
                        <TablaUltimosRegistros 
                            registros={registros} 
                            integranteId={id} 
                        />
                    </Box>
                </>
            )}

            <FormularioIntegrante 
                open={openModal} 
                onClose={() => setOpenModal(false)} 
                integrante={integrante}
                onGuardar={handleActualizarPerfil}
            />

            <AsignarPermisos
                open={openModalPermisos}
                onClose={() => setOpenModalPermisos(false)}
                integranteId={id}
                permisosActuales={permisos || []}
                onAsignacionExitosa={cargarDatosPerfil}
            />

            <AsignarProyectos
                open={openProyectosModal}
                onClose={() => setOpenProyectosModal(false)}
                integranteId={id}
                proyectosActuales={proyectos || []}
                onAsignacionExitosa={cargarDatosPerfil}
            />

        </Box>
    );
};

export default PerfilIntegrante;