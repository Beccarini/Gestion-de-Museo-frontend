import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Box, Grid, Alert, CircularProgress } from '@mui/material';

import CardInfoBasica from '../components/perfilIntegrantes/CardInfoBasica';
import FormularioIntegrante from '../components/FormularioIntegrante'

import { getIntegranteById, updateIntegrante } from '../services/integranteService';

const PerfilIntegrante = () => {
    const id = 'a6b70eb8-9487-4528-9ef1-bc86ebeef9f6';
    const [integrante, setIntegrante] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const cargarDatosPerfil = () => {
        setLoading(true);
        setError(null);
        
        getIntegranteById(id)
            .then((datos) => {
                setIntegrante(datos);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("No se pudo cargar el perfil del integrante. Verificá la conexión.");
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
        <Box sx={{ width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, mt: 5, mb: 5 }}>            
            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {integrante && (
                <>
                    
                    {/* FILA 1: Tarjeta Principal (xs={12} para que ocupe el 100% del ancho) */}
                    <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 5, mb: 5 }}>                        <CardInfoBasica 
                            integrante={integrante} 
                            onAbrirEditar={() => setOpenModal(true)} 
                        />
                    </Box>

                    <Grid container spacing={3}>
                        
                        {/* Proyectos y Permisos (md={6} para que se dividan mitad y mitad) */}
                        <Grid item xs={12} md={6}>
                            {/* ACÁ IRÁ SECCION PROYECTOS */}
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            {/* ACÁ IRÁ SECCION PERMISOS */}
                        </Grid>

                        {/* Historial (xs={12} para que ocupe todo abajo) */}
                        <Grid item xs={12}>
                            {/* ACÁ IRÁ TABLA ULTIMOS REGISTROS */}
                        </Grid>

                    </Grid>

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