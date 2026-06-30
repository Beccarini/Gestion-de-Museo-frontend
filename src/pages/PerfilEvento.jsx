import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getEventoById, getRegistrosByEvento } from '../services/eventoService';
import { MostrarTablaRegistros } from "../components/PerfilEventos/MostrarTablaRegistros";
import { MostrarEvento } from "../components/PerfilEventos/MostrarEvento";
import {deleteRegistro} from '../services/registrosService';
export function PerfilEvento(){
    const { id } = useParams();
    const [evento, setEvento] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [registros, setRegistros] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [limite, setLimite] = useState(5);
    const [totalRegistros, setTotalRegistros] = useState(0);
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

    // 2. Cargar Registros (Se dispara al iniciar y cada vez que cambia 'pagina' o 'limite')
    useEffect(() => {
        cargarRegistros();
    }, [id, pagina, limite]);

    const cargarRegistros = () => {
        getRegistrosByEvento(id, pagina, limite).then((data) => {
            setRegistros(data.registrosPaginados.registros || []);
            const total = data.registrosPaginados.totalElementos || 0;
            setTotalRegistros(total);
        }).catch((error) => {
            console.error("Error al obtener registros:", error);
        });
    };
    // 3. Eliminación lógica/física en Base de Datos
    const handleEliminarRegistro = (registroId) => {
        if (window.confirm("¿Seguro que deseas eliminar definitivamente este registro de asistencia?")) {
            deleteRegistro(registroId)
                .then(() => {
                    alert("Registro eliminado correctamente.");
                    // Si quedan registros en la página actual o es la primera, recarga el componente
                    if (registros.length === 1 && pagina > 1) {
                        setPagina(prev => prev - 1);
                    } else {
                        cargarRegistros(); // Recarga la página actual para traer datos frescos de la BD
                    }
                })
                .catch((error) => {
                    console.error("Error al eliminar el registro:", error);
                    alert("No se pudo eliminar el registro en el servidor.");
                });
        }
    };

    if (cargando) {
        return <Typography sx={{ p: 3 }}>Cargando información del evento...</Typography>;
    }

    if (!evento) {
        return <Typography sx={{ p: 3 }} color="error">No se encontró el evento solicitado.</Typography>;
    }

    return (
        <Box sx={{ p: 3, maxWidth: 1100, mx: 'auto' }}>
            <Button startIcon={<ArrowBackIcon />} component={Link} to={`/eventos`} sx={{ mb: 2 }}>
                Volver al listado
            </Button>

            <MostrarEvento evento={evento}/>

            <Typography variant="h5" component="h2" sx={{ mb: 2, mt: 4, fontWeight: 500 }}>
                Registros de Asistencia Vinculados
            </Typography>

            {/* Inyección de props de control a la tabla */}
            <MostrarTablaRegistros 
                registros={registros}
                totalRegistros={totalRegistros}
                pagina={pagina}
                limite={limite}
                onChangePagina={setPagina}
                onChangeLimite={setLimite}
                handleEliminarRegistro={handleEliminarRegistro} 
            />
        </Box>
    );
};