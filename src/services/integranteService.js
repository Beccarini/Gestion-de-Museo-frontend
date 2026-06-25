import api from './api';

export const getIntegrantes = async () => {
    const response = await api.get('/integrantes');
    return response.data; 
};

export const getIntegranteById = async (id) => {
    const response = await api.get(`/integrantes/${id}`);
    return response.data;
};

export const createIntegrante = async (datosIntegrante) => {
    const response = await api.post('/integrantes', datosIntegrante);
    return response.data;
};

export const updateIntegrante = async (id, datosActualizados) => {
    const response = await api.put(`/integrantes/${id}`, datosActualizados);
    return response.data;
};

export const deleteIntegrante = async (id) => {
    const response = await api.delete(`/integrantes/${id}`);
    return response; 
};

export const toggleEstadoIntegrante = async (id) => {
    const response = await api.patch(`integrantes/${id}/toggle`);
    return response.data;
};