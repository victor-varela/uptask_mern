import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export default api;



/**
 * axios.create tiene un objeto de configuracion { } con baseURL que le vamos a asignar una variable de entorno para proteger los datos de la api-- esta variable de entorno le asignaos la url base del backend 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */