import api from './api';

export const getIntegrantes = async (nombre = '', carrera = '', pagina= 1, limite=20) => {
    const params = { pagina, limite };
    if (nombre) params.nombre = nombre;
    if (carrera) params.carrera = carrera;

    const response = await api.get('/integrantes', {params});
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

export const getRegistrosByIntegrante = async (id, pagina = 1, limite = 5) => {
    const params = { pagina, limite };
    
    const response = await api.get(`/integrantes/${id}/registros`, { params });
    
    return response.data; 
};

export const getPermisosByIntegrante = async (id) => {

    const response = await api.get(`/integrantes/${id}/permisos`);
    return response.data; 
};

export const getProyectosByIntegrante = async (id) => {
    const response = await api.get(`/integrantes/${id}/proyectos`);
    return response.data; 
};

export const asignarPermiso = async (id, permisoId) => {
    const response = await api.post(`/integrantes/${id}/permisos`, { permisoId });
    return response.data;
};

export const desvincularPermiso = async (id, permisoId) => {
    const response = await api.delete(`/integrantes/${id}/permisos/${permisoId}`);
    return response.data;
};


export const asignarMultiplesPermisos = async (integranteId, permisosIds) => {
        const peticiones = permisosIds.map(permisoId => 
        api.post(`/integrantes/${integranteId}/permisos`, { permisoId })
    );
    
    await Promise.all(peticiones);
    return true;
};

export const asignarPermisoMasivo = async (permisoId, integrantesIds) => {
    const peticiones = integrantesIds.map(integranteId => 
        api.post(`/integrantes/${integranteId}/permisos`, { permisoId })
    );
    
    const resultados = await Promise.allSettled(peticiones);
    return resultados;
};


export const asignarProyecto = async (id, proyectoId) => {
    const response = await api.post(`/integrantes/${id}/proyectos`, { proyectoId });
    return response.data;
};

export const desvincularProyecto = async (id, proyectoId) => {
    const response = await api.delete(`/integrantes/${id}/proyectos/${proyectoId}`);
    return response.data;
};
