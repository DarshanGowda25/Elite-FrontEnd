import axios from "axios";

const Server_URL = import.meta.env.ELITE_SERVER_URL

const apiClient = axios.create({
    baseURL: Server_URL
})

apiClient.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token")

        if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error)
    }
   
);

export const axiosInstance  = apiClient