import api from 'api.js';
export const getAllRecursos=async()=>{
    const response=await api.get('/recursos');
    return response.data;
}
export const addRecurso=async(dataRecurso)=>{
    const response=await api.post('/recurso',dataRecurso);
    return response.data;
}
export const getRecursoById=async(id)=>{
    const response=await api.get(`/recurso/${id}`);
    return response.data;
}
export const deleteRecurso=async(id)=>{
    const response=await api.delete(`/recurso/${id}`);
    return response.data;
}
export const updateRecurso=async(id, dataRecurso)=>{
    const response=await api.put(`/recurso/${id}`,dataRecurso);
    return response.data;
}