import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Box, Grid, Alert, CircularProgress } from '@mui/material';

import CardInfoBasica from '../components/perfilIntegrantes/CardInfoBasica';
import FormularioIntegrante from '../components/FormularioIntegrante'
import TablaUltimosRegistros from '../components/perfilIntegrantes/TablaUltimosRegistros';
import SeccionPermisos from '../components/perfilIntegrantes/SeccionPermisos'
import SeccionProyectos from '../components/perfilIntegrantes/SeccionProyectos'; // <-- Nuevo

import { getIntegranteById, updateIntegrante, 
        getRegistrosByIntegrante, getPermisosByIntegrante,
        getProyectosByIntegrante 
} from '../services/integranteService';

const PerfilIntegrante = () => {
    const { id } = useParams();
    const [integrante, setIntegrante] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [permisos, setPermisos] = useState(null);
    const [proyectos, setProyectos] = useState(null);

    const cargarDatosPerfil = () => {
        setLoading(true);
        setError(null);
        
        Promise.all([
            getIntegranteById(id),
            getRegistrosByIntegrante(id, 1, 5),
            getPermisosByIntegrante(id).catch(() => null),
            getProyectosByIntegrante(id).catch(() => null)
        ])
        .then(([datosIntegrante, datosBackend, datosPermisos, datosProyectos]) => {
            setIntegrante(datosIntegrante);
            
            if (datosBackend.registrosPaginados && datosBackend.registrosPaginados.historial) {
                setRegistros(datosBackend.registrosPaginados.historial);
            } else {
                setRegistros([]); 
            }

            setPermisos(datosPermisos);
            setProyectos(datosProyectos)
            
            setLoading(false);
        })
        .catch((err) => {
            console.error(err);
            setError("No se pudo cargar el perfil. Verificá la conexión con la API.");
            setLoading(false);
        });
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

    if (loading) {
        return (
            <Box display="flex" sx={{ flexDirection: 'column', alignItems: 'center', py: 20 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 2, mb: 5 }}>
            
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
                        />
                    </Box>

                    <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'column', md: 'row' }, 
                        gap: 3, 
                        mb: 3,
                        width: '100%' 
                    }}>
                        {/* Mitad izquierda para Permisos */}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <SeccionPermisos permisosIniciales={permisos} />
                        </Box>
                        
                        {/* Mitad derecha para Proyectos */}
                        <Box sx={{ flex: 1, display: 'flex' }}>
                            <SeccionProyectos proyectosIniciales={proyectos} />
                        </Box>
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

        </Box>
    );
};


export default PerfilIntegrante;