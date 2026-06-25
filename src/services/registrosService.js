import api from './api';
export const getRegistros=async()=>{
    const response= await api.get('/registros')
    return response.data;
}
export const getRegistroById=async(id)=>{
    const response= await api.get(`/registros/${id}`)
    return response.data;
}
export const deleteRegistro=async(id)=>{
    const response= await api.delete(`/registros/${id}`)
    return response.data;
}
export const postRegistro=async(dataRegistro)=>{
    const response= await api.post(`/registros`,dataRegistro)
    return response.data;
}