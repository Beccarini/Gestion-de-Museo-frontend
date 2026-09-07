import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getEventoById, getRegistrosByEvento, updateEvento, deleteEvento } from '../services/eventoService';
import { getIntegranteById } from '../services/integranteService'; 
import { MostrarTablaRegistros } from "../components/perfilEventos/MostrarTablaRegistros";
import { MostrarEvento } from "../components/perfilEventos/MostrarEvento";
import { AltaEvento } from '../components/gestionEventos/AltaEvento';
import {deleteRegistro} from '../services/registrosService';
export function PerfilEvento(){
    const { id } = useParams();
    const navigate = useNavigate(); 

    const [evento, setEvento] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [registros, setRegistros] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [totalRegistros, setTotalRegistros] = useState(0);
    const [modalEdicionAbierto, setModalEdicionAbierto] = useState(false);

    useEffect(() => {
        getEventoById(id)
            .then((data) => {
                setEvento(data);
                setCargando(false);
            })
            .catch((error) => {
                console.error("Error al obtener el evento:", error);
                setCargando(false);
            });
    }, [id]);
    
    useEffect(() => {
        if (id) {
            cargarRegistros();
        }
    }, [id, pagina]); 

    const cargarRegistros = async () => {
        try {
            const data = await getRegistrosByEvento(id, pagina, 10);
            const registrosRaw = data.registrosPaginados?.registros || data.registros || [];
            
            setTotalPaginas(data.registrosPaginados?.totalPaginas || data.totalPaginas || 0);
            setTotalRegistros(data.registrosPaginados?.totalElementos || 0); 

            const registrosConNombres = await Promise.all(
                registrosRaw.map(async (reg) => {
                    let integranteData = null;
                    if (reg.integranteId) {
                        try {
                            integranteData = await getIntegranteById(reg.integranteId);
                        } catch (err) {
                            console.warn(`Error obteniendo integrante ${reg.integranteId}`);
                        }
                    }
                    return {
                        ...reg,
                        Integrante: integranteData || null
                    };
                })
            );
            setRegistros(registrosConNombres);
        } catch (error) {
            console.error("Error al obtener registros:", error);
        }
    };

    const handleGuardarEdicion = async (datosEditados) => {
        try {
            const eventoActualizado = await updateEvento(id, datosEditados);
            setEvento(eventoActualizado);
            alert("Evento actualizado correctamente.");
        } catch (error) {
            console.error("Error al actualizar el evento:", error);
            alert("Hubo un error al actualizar el evento en el servidor.");
        }
    };

    const handleEliminarEvento = async () => {
        if (window.confirm("¿Estás seguro de que deseás eliminar este evento de forma permanente?")) {
            try {
                await deleteEvento(id);
                navigate('/eventos'); 
            } catch (error) {
                console.error("Error al eliminar el evento:", error);
                alert("Hubo un error al intentar eliminar el evento. Verificá si tiene registros asociados.");
            }
        }
    };


    if (cargando) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 10 }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Cargando información del evento...</Typography>
            </Box>
        );
    }

    if (!evento) {
        return <Typography sx={{ p: 3 }} color="error">No se encontró el evento solicitado.</Typography>;
    }

    return (
        <Box sx={{ width: '100%', maxWidth: '1300px', mx: 'auto', px: { xs: 2, md: 3 }, mt: 2, mb: 5 }}>
            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/integrantes`} sx={{ mb: 2 }} size='small'>
                Volver al listado
            </Button>

            <MostrarEvento 
                evento={evento}
                onEditar={() => setModalEdicionAbierto(true)}
                onEliminar={handleEliminarEvento}
            />

            <MostrarTablaRegistros 
                registros={registros}
                totalPaginas={totalPaginas}
                totalRegistros={totalRegistros}
                pagina={pagina}
                onChangePagina={setPagina}
            />

            <AltaEvento 
                open={modalEdicionAbierto}
                onClose={() => setModalEdicionAbierto(false)}
                eventoAEditar={evento}
                nuevoEvento={handleGuardarEdicion} 
            />
        </Box>
    );
};