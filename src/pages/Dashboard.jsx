import React, { useState, useEffect } from 'react';
import { Typography, Box, CircularProgress, Paper } from '@mui/material';

// Iconos
import PeopleIcon from '@mui/icons-material/People';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';

// Componentes propios
import { StatsCard } from '../components/dashboard/StatsCard';
import { RegistrosRecientes } from '../components/dashboard/RegistrosRecientes';
import { AlertaProyectos } from '../components/dashboard/AlertaProyectos';
import { NextEvents } from '../components/dashboard/NextEvent';

// Servicios
import { getIntegrantes, getIntegranteById } from '../services/integranteService';
import { getRegistros } from '../services/registrosService';
import { getEventos } from '../services/eventoService'; 
//agregar getProyectos

const Dashboard = () => {
    const [data, setData] = useState({ 
        stats: { integrantes: 0, registros: 0, proyectos: 0, eventos: 0 }, 
        registros: [], 
        proyectos: [],
        eventos: []
    });
    const [loading, setLoading] = useState(true);
    const [registrosConNombre, setRegistrosConNombre] = useState([]);

    const cargarDashboard = () => {
        setLoading(true);
        Promise.all([
            getIntegrantes(), 
            getRegistros(), 
            getEventos()
            //getProyectos() 
        ])
        .then(async ([intRes, regRes, evenRes]) => {
            const listaEventos = (evenRes.eventos || evenRes || []).map(ev => ({
                ...ev,
                fechaInicio: ev.fechaInicio ? new Date(ev.fechaInicio) : null,
                fechaFin: ev.fechaFin ? new Date(ev.fechaFin) : null,
            }));

            const registrosConNombre = await Promise.all(
                (regRes.registros || []).map(async (reg) => {
                    if (!reg.integranteId) {
                        return { ...reg, integranteNombre: 'Desconocido' };
                    }
                    try {
                        const integrante = await getIntegranteById(reg.integranteId);
                        return { ...reg, integranteNombre: integrante.nombre };
                    } catch (e) {
                        return { ...reg, integranteNombre: 'Desconocido' };
                    }
                })
            );

            setData({
                stats: { 
                    integrantes: intRes?.totalElementos || 0,
                    registros: regRes?.totalElementos || 0,
                    eventos: listaEventos.length
                    //proyectos: proyRes?.totalElementos || 0
                },
                registros: registrosConNombre.slice(0, 5),
                eventos: listaEventos.slice(0, 5) 
                //proyectos: proyRes?.proyectos || []
            });
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error al cargar dashboard:", err);
            setLoading(false);
        });
    };
    useEffect(() => {
        cargarDashboard();
    }, []);

    if (loading) return (
        <Box sx={{ 
            p: 4, 
            width: '100%', 
            boxSizing: 'border-box', 
            backgroundColor: '#f9f9f9', 
            minHeight: '100vh'}}>
            <CircularProgress />
        </Box>
    );

return (
        <Box sx={{ p: 4, width: '100%', boxSizing: 'border-box', backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: '800', color: '#1a2027' }}>
                Panel de Control
            </Typography>
            
            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
                gap: 3, 
                mb: 4 
            }}>
                <StatsCard title="Integrantes" value={data.stats.integrantes} icon={<PeopleIcon />} color="primary.main" />
                <StatsCard title="Proyectos" value={0} icon={<AccountTreeIcon />} color="secondary.main" /> {/* agregar data.stats.proyectos si se implementa getProyectos() */}
                <StatsCard title="Registros" value={data.stats.registros} icon={<AssignmentIcon />} color="success.main" />
                <StatsCard title="Eventos" value={data.stats.eventos} icon={<EventIcon />} color="warning.main" />
            </Box>

            <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', md: '1.3fr 1fr' }, // <--- EL CAMBIO ESTÁ ACÁ
                gap: 3 
            }}>
                <Box>
                    <RegistrosRecientes records={data.registros} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <NextEvents events={data.eventos} />
                    <AlertaProyectos projects={[]} />
                </Box>
            </Box>
        </Box>
    );
};


export default Dashboard;