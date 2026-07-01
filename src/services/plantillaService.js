import api from './api';

export const getPlantillas = async () => {
    const response = await api.get('/plantillas');
    return response.data;
};

export const getPlantillaById = async (id) => {
    const response = await api.get(`/plantillas/${id}`);
    return response.data;
};

export const getEventosByPlantilla = async (id) => {
    const response = await api.get(`/plantillas/${id}/eventos`);
    return response.data;
};

export const createPlantilla = async (datosPlantilla) => {
    const response = await api.post('/plantillas', datosPlantilla);
    return response.data;
};

export const updatePlantilla = async (id, datosActualizados) => {
    const response = await api.put(`/plantillas/${id}`, datosActualizados);
    return response.data;
};

export const togglePlantillaEstado = async (id) => {
    const response = await api.patch(`/plantillas/${id}/toggle`);
    return response.data;
};

export const deletePlantilla = async (id) => {
    const response = await api.delete(`/plantillas/${id}`);
    return response; 
};