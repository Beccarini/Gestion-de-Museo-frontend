import api from './api';

export const getRegistros = async (filtros = {}) => {
    // Extraemos los filtros con valores por defecto para paginación
    const { 
        pagina = 1, 
        limite = 10, 
        integranteId, 
        fechaInicio, 
        fechaFin, 
        esAsistencia, 
        esApertura 
    } = filtros;
    
    const params = { pagina, limite };

    // Agregamos condicionalmente los parámetros que tengan valor
    if (integranteId) params.integranteId = integranteId;
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    if (esAsistencia !== '' && esAsistencia !== undefined) params.esAsistencia = esAsistencia;
    if (esApertura !== '' && esApertura !== undefined) params.esApertura = esApertura;

    const response = await api.get('/registros', { params });
    return response.data;
};

export const getRegistroById = async (id) => {
    const response = await api.get(`/registros/${id}`);
    return response.data;
};

export const deleteRegistro = async (id) => {
    const response = await api.delete(`/registros/${id}`);
    return response.data;
};

export const postRegistro = async (dataRegistro) => {
    const response = await api.post(`/registros`, dataRegistro);
    return response.data;
};