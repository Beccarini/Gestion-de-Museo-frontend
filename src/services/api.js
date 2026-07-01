import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Si el backend tira un error, revisa si es un 401 (No autorizado / Expirado)
        if (error.response && error.response.status === 401) {
            // Verifica que no sea la ruta del login propiamente dicha
            if (!error.config.url.includes('/auth/login')) {
                console.warn('🔴 Sesión expirada o token inválido. Forzando cierre de sesión...');
                
                
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                
                //Redirige al login limpiando el estado de la app
                window.location.href = '/login';
            }
        }
    }
)

export default api;