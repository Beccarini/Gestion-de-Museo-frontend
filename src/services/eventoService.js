import api from './api';

export const getEventos = async () => {
    const response = await api.get('/eventos');
    return response.data; 
};

export const getEventoById = async (id) => {
    const response = await api.get(`/eventos/${id}`);
    return response.data;
};

export const createEvento = async (datosEvento) => {
    const response = await api.post('/eventos', datosEvento);
    return response.data;
};

export const updateEvento = async (id, datosActualizados) => {
    const response = await api.put(`/eventos/${id}`, datosActualizados);
    return response.data;
};  

export const deleteEvento = async (id) => {
    const response = await api.delete(`/eventos/${id}`);
    return response; 
};
export const getRegistrosByEvento = async (id, pagina = 1, limite = 5) => {
    const params = { pagina, limite };
    const response = await api.get(`/eventos/${id}/registros`, { params });
    
    return response.data; 
};