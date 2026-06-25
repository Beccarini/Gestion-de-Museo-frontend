import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import TablaIntegrantes from '../components/TablaIntegrantes'; 
import FormularioIntegrante from '../components/FormularioIntegrante';

import { 
    getIntegrantes, 
    deleteIntegrante, 
    toggleEstadoIntegrante,
    createIntegrante,
    updateIntegrante 
} from '../services/integranteService';

const GestionIntegrantes = () => {
    const [listaIntegrantes, setListaIntegrantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [integranteAEditar, setIntegranteAEditar] = useState(null);

    const obtenerIntegrantes = () => {
        setLoading(true);
        setError(null);

        getIntegrantes()
            .then((data) => {
                setLoading(false);
                setListaIntegrantes(data.integrantes || data);
            })
            .catch((err) => {
                setLoading(false);
                setError("No se pudieron cargar los Integrantes. Verificá que el servidor esté corriendo.");
                console.error(err);
            });
    };

    useEffect(() => {
        obtenerIntegrantes();
    }, []);

    const handleGuardar = (datosForm) => {
        if (integranteAEditar) {
            updateIntegrante(integranteAEditar.id, datosForm)
                .then(() => {
                    obtenerIntegrantes();
                    setOpenModal(false);
                    setIntegranteAEditar(null);
                })
                .catch((err) => {
                    setError('Hubo un problema al intentar actualizar el registro.');
                    console.error(err);
                });
        } else {
            createIntegrante(datosForm)
                .then(() => {
                    obtenerIntegrantes();
                    setOpenModal(false);
                })
                .catch((err) => {
                    setError('Hubo un problema al intentar crear el registro.');
                    console.error(err);
                });
        }
    };

    const handleAbrirEditar = (integrante) => {
        setIntegranteAEditar(integrante);
        setOpenModal(true);
    };

    const handleCerrarModal = () => {
        setOpenModal(false);
        setIntegranteAEditar(null);
    };

    const handleEliminar = (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar este integrante?');
        if (!confirmar) return;

        deleteIntegrante(id)
            .then((response) => {
                if (response.status === 204) {
                    setListaIntegrantes(listaIntegrantes.filter((int) => int.id !== id));
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 409) {
                    setError(err.response.data.error);
                } else {
                    setError('Hubo un problema al intentar eliminar el registro.');
                }
                console.error(err);
            });
    };

    const handleToggleEstado = (id) => {
        toggleEstadoIntegrante(id)
            .then(() => {
                setListaIntegrantes(listaIntegrantes.map(int => 
                    int.id === id ? { ...int, esActivo: !int.esActivo } : int
                ));
            })
            .catch((err) => {
                setError("No se pudo actualizar el estado del integrante.");
                console.error(err);
            });
    };

    const integrantesFiltrados = listaIntegrantes.filter(int => 
        int.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: '1300px', 
            mx: 'auto',         
            px: { xs: 2, md: 3 }, 
            mt: 5, 
            mb: 5 
        }}>
            {/* CONTENEDOR DEL ENCABEZADO (Flexbox para alinear a los lados) */}
            <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 4 
            }}>
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary">
                    Gestión de Integrantes
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<AddIcon />} 
                    disableElevation
                    onClick={() => setOpenModal(true)} 
                >                  
                    Nuevo Integrante
                </Button>
                <FormularioIntegrante 
                    open={openModal} 
                    onClose={handleCerrarModal} 
                    onGuardar={handleGuardar} 
                    integrante={integranteAEditar}
                />
            </Box>

            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {/* BUSCADOR */}
            <TextField
                fullWidth
                label="Buscar por Nombre..."
                variant="outlined"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                sx={{ mb: 4, backgroundColor: 'white' }}
            />

            {/* TABLA */}
            <TablaIntegrantes 
                integrantes={integrantesFiltrados} 
                cargando={loading}
                onToggleEstado={handleToggleEstado}
                onEliminar={handleEliminar}
                onEditar={handleAbrirEditar}
            />
        </Box>
    );
};

export default GestionIntegrantes;