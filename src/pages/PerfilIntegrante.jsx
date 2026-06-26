import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Box, Grid, Alert, CircularProgress } from '@mui/material';

import CardInfoBasica from '../components/perfilIntegrantes/CardInfoBasica';
import FormularioIntegrante from '../components/FormularioIntegrante'
import TablaUltimosRegistros from '../components/perfilIntegrantes/TablaUltimosRegistros';

import { getIntegranteById, updateIntegrante } from '../services/integranteService';
import { getRegistros} from '../services/registrosService'

const PerfilIntegrante = () => {
    const { id } = useParams();
    const [integrante, setIntegrante] = useState(null);
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openModal, setOpenModal] = useState(false);

const cargarDatosPerfil = () => {
        setLoading(true);
        setError(null);
        
        Promise.all([
            getIntegranteById(id),
            getRegistros(id, 1, 5) 
        ])
        .then(([datosIntegrante, datosRegistros]) => {
            setIntegrante(datosIntegrante);            
            setRegistros(datosRegistros.registros);
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
        // Le puse 1000px de máximo temporalmente para que no se vea tan vacío a los costados
        <Box sx={{ width: '100%', maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 5, mb: 5 }}>
            
            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {integrante && (
                <>
                    {/* BLOQUE SUPERIOR: Tarjeta Principal */}
                    <Box sx={{ width: '100%', mb: 3 }}>
                        <CardInfoBasica 
                            integrante={integrante} 
                            onAbrirEditar={() => setOpenModal(true)} 
                        />
                    </Box>

                    {/* BLOQUE INFERIOR: Historial de Registros */}
                    <Box sx={{ width: '100%' }}>
                        <TablaUltimosRegistros 
                            registros={registros} 
                            integranteId={id} 
                        />
                    </Box>
                </>
            )}

            {/* Modal Reutilizado */}
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