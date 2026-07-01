import api from './api';

export const getPermisos = async (pagina = 1, limite = 10, diaSemana = '') => {
    const params = new URLSearchParams({ pagina, limite });
    if (diaSemana) params.append('diaSemana', diaSemana);
    
    const response = await api.get(`/permisos?${params.toString()}`);
    return response.data;
};

export const getPermisoById = async (id) => {
    const response = await api.get(`/permisos/${id}`);
    return response.data;
};

export const getIntegrantesPorPermiso = async (permisoId) => {
    const response = await api.get(`/permisos/${permisoId}/integrantes`);
    return response.data;
};

export const crearPermiso = async (permisoData) => {
    const response = await api.post('/permisos', permisoData);
    return response.data;
};

export const actualizarPermiso = async (id, permisoData) => {
    const response = await api.put(`/permisos/${id}`, permisoData);
    return response.data;
};

export const eliminarPermiso = async (id) => {
    const response = await api.delete(`/permisos/${id}`);
    return response.data;
};