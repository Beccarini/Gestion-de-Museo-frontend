import {api} from './api';
export const getRegistros=async()=>{
    const response= await api.get('/registros')
    return response.data;
}
export const getRegistroById=async(id)=>{
    const response= await api.get('/registros/${id}')
    return response.data;
}
export const getRegistros=async()=>{
    const response= await api.get('/registros')
    return response.data;
}
export const getRegistros=async()=>{
    const response= await api.get('/registros')
    return response.data;
}