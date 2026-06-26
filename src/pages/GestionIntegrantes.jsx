import React, { useState, useEffect } from 'react';
import { 
    Box, Button, TextField, Alert, Typography, 
    FormControl, InputLabel, Select, MenuItem,
    Pagination 
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TablaIntegrantes from '../components/gestionIntegrantes/TablaIntegrantes'; 
import FormularioIntegrante from '../components/gestionIntegrantes/FormularioIntegrante';
import FiltrosIntegrantes from '../components/gestionIntegrantes/FiltrosIntegrantes';
import EncabezadoIntegrantes from '../components/gestionIntegrantes/EncabezadoIntegrantes';

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
    const [openModal, setOpenModal] = useState(false);
    const [integranteAEditar, setIntegranteAEditar] = useState(null); 
    const [filtroNombre, setFiltroNombre] = useState('');
    const [filtroCarrera, setFiltroCarrera] = useState('');
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [limite, setLimite] = useState(20); 

    const obtenerIntegrantes = () => {
        setLoading(true);
        setError(null);

        getIntegrantes(filtroNombre, filtroCarrera, pagina, limite)
            .then((data) => {
                setLoading(false);
                setListaIntegrantes(data.integrantes || []);
                setTotalPaginas(data.totalPaginas || 1); 
            })
            .catch((err) => {
                setLoading(false);
                setError("No se pudieron cargar los Integrantes. Verificá que el servidor esté corriendo.");
                console.error(err);
            });
    };

    useEffect(() => {
        setPagina(1);
    }, [filtroNombre, filtroCarrera]);

    useEffect(() => {
        const timer = setTimeout(() => {
            obtenerIntegrantes();
        }, 500); 

        return () => clearTimeout(timer); 
    }, [filtroNombre, filtroCarrera, pagina]);

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
                if (response.status === 204 || response.status === 200) {
                    // Refrescamos desde el backend para mantener la paginación/orden correcto
                    obtenerIntegrantes(); 
                }
            })
            .catch((err) => {
                setError('Hubo un problema al intentar eliminar el registro.');
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

    const handleChangePagina = (event, value) => {
        setPagina(value);
    };

    return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: '1300px', 
            mx: 'auto',         
            px: { xs: 2, md: 3 }, 
            mt: 5, 
            mb: 5 
        }}>
            
            <EncabezadoIntegrantes onAbrirModal={() => setOpenModal(true)} />

            <FormularioIntegrante 
                open={openModal} 
                onClose={handleCerrarModal} 
                onGuardar={handleGuardar} 
                integrante={integranteAEditar}
            />

            {error && (
                <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            <FiltrosIntegrantes 
                filtroNombre={filtroNombre}
                setFiltroNombre={setFiltroNombre}
                filtroCarrera={filtroCarrera}
                setFiltroCarrera={setFiltroCarrera}
            />

            <TablaIntegrantes 
                integrantes={listaIntegrantes} 
                cargando={loading}
                onToggleEstado={handleToggleEstado}
                onEliminar={handleEliminar}
                onEditar={handleAbrirEditar}
            />

            {!loading && totalPaginas > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination 
                        count={totalPaginas} 
                        page={pagina} 
                        onChange={handleChangePagina} 
                        color="primary" 
                        size="large"
                    />
                </Box>
            )}

        </Box>
    );
};

export default GestionIntegrantes;