
import api from './api'; 

const BASE_URL = '/proyectos'; 

export const getProyectos = async (pagina = 1, limite = 10, nombre = '', estado = '') => {
   
    const params = new URLSearchParams({
        pagina,
        limite,
        ...(nombre && { nombre }),
        ...(estado && { estado })
    });

    const response = await api.get(`${BASE_URL}?${params.toString()}`);
    return response.data;
};

export const getProyectoById = async (id) => {
    const response = await api.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const crearProyecto = async (proyectoData) => {
    const response = await api.post(BASE_URL, proyectoData);
    return response.data;
};

export const actualizarProyecto = async (id, proyectoData) => {
    const response = await api.put(`${BASE_URL}/${id}`, proyectoData);
    return response.data;
};

export const eliminarProyecto = async (id) => {
    const response = await api.delete(`${BASE_URL}/${id}`);
    return response.data;
};


export const getIntegrantesPorProyecto = async (id) => {
    const response = await api.get(`${BASE_URL}/${id}/integrantes`);
    return response.data;
};


export const asignarIntegranteAProyecto = async (integranteId, proyectoId) => {
   
    const response = await api.post(`/integrantes/${integranteId}/proyectos`, { proyectoId });
    return response.data;
};


export const desvincularIntegranteProyecto = async (proyectoId, integranteId) => {

    const response = await api.delete(`/integrantes/${integranteId}/proyectos/${proyectoId}`);
    return response.data;
};