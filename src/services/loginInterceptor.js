import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.withCredentials = true
        config.headers['Source'] = 'Browser'
    }

    return config;
});



api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("Response Interceptor Error : ", error)
        return Promise.reject(error);
    }
);

export default api;