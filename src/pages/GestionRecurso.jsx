import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { getAllRecursos, addRecurso, updateRecurso, deleteRecurso } from '../services/recursoService';
import { AltaModificacionRecursos } from "../components/perfilRecursos/AltaModificacionRecursos";
import { Filtros } from '../components/perfilRecursos/Filtros';
import { MostrarRecursos } from "../components/perfilRecursos/MostrarRecursos";

export function GestionRecurso() {
    const [error, setError]=useState(null);
    const [recursos,setRecursos]=useState([]);
    const [recursoAEditar, setRecursoAEditar]=useState(null);
    const [page, setPage]=useState(1);
    const [filtroNombre, setFiltroNombre]=useState('');
    const [filtroCategoria, setFiltroCategoria]=useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const obtenerRecursos=async()=>{
        try{
            const obtenerRecursosDelBack=await getAllRecursos({
                page: page,
                nombre: filtroNombre,
                categoria: filtroCategoria
            });
            setRecursos(obtenerRecursosDelBack.recursos);
        }catch(err){
            setError(err);
        }
    };
    const borrarRecurso=async(idRecurso)=>{
        deleteRecurso(idRecurso);
        obtenerRecursos();
    }
    const nuevoRecurso=async(datosRecurso)=>{
        if(recursoAEditar){
            updateRecurso(recursoAEditar.id, datosRecurso);
            setRecursoAEditar(null);
        }else{
            addRecurso(datosRecurso);
        }
        obtenerRecursos();
    }
    useEffect(()=>{
        obtenerRecursos();
    },[page, filtroCategoria, filtroNombre]);
    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a2027' }}>
                    Gestión de Registros
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setIsModalOpen(true)}
                    sx={{ 
                        borderRadius: '8px', 
                        fontWeight: 600, 
                        px: 3,
                        py: 1,
                        boxShadow: '0 4px 10px rgba(26, 115, 232, 0.3)',
                        transition: 'all 0.2s',
                        '&:hover': { 
                            boxShadow: '0 6px 15px rgba(26, 115, 232, 0.4)', 
                            transform: 'translateY(-2px)' 
                        }
                    }}
                >
                    NUEVO REGISTRO
                </Button>
            </Box>
            <AltaModificacionRecursos 
                nuevoRecurso={nuevoRecurso} 
                open={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                recursoAEditar={recursoAEditar}
                setRecursoAEditar={()=>setRecursoAEditar(null)}
            />
            <Typography variant="h4" gutterBottom>Inventario</Typography>
            <MostrarRecursos 
                recursos={recursos} 
                setRecursoAEditar={setRecursoAEditar} 
                onReload={obtenerRecursos}
                borrarRecurso={borrarRecurso}
                abrirModal={() => setIsModalOpen(true)}
            />
        </Box>
    );
}