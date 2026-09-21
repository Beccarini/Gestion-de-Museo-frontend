import api from './api.js';
export const getAllRecursos=async(params={})=>{
    const response=await api.get('/recursos',{params});
    return response.data;
}
export const addRecurso=async(dataRecurso)=>{
    const response=await api.post('/recursos',dataRecurso);
    return response.data;
}
export const getRecursoById=async(id)=>{
    const response=await api.get(`/recursos/${id}`);
    return response.data;
}
export const deleteRecurso=async(id)=>{
    const response=await api.delete(`/recursos/${id}`);
    return response.data;
}
export const updateRecurso=async(id, dataRecurso)=>{
    const response=await api.put(`/recursos/${id}`,dataRecurso);
    return response.data;
}