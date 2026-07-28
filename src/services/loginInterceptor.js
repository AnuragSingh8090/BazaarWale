import axios from "axios";
import apiService from "./apiService";
import Store from '../store/Store.js'
import { startLoading, stopLoading, updateToken, logoutUser } from "../store/slices/userSlice";


const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("userToken");
    config.withCredentials = true
    config.headers['Source'] = 'Browser'

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});



let refreshPromise = null;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.status || error.response?.status;

        if (status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // stop this request from retrying more than once

            try {
                await getRefreshToken(); // wait for a fresh token
                return api(originalRequest); // resend original request — request interceptor attaches new token from localStorage automatically
            } catch (refreshError) {
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);


async function getRefreshToken() {
    if (!refreshPromise) {
        refreshPromise = (async () => {
            try {
                Store.dispatch(startLoading())
                const response = await apiService.refreshToken()
                const token = response.token;
                Store.dispatch(updateToken(token)) // this also syncs localStorage, per your setup
                return token;
            }
            catch (error) {
                Store.dispatch(logoutUser())
                throw error; // must rethrow so the response interceptor's catch block also fires
            }
            finally {
                Store.dispatch(stopLoading())
                refreshPromise = null; // reset so the next expiry can start a fresh refresh cycle
            }
        })();
    }
    return refreshPromise;
}

export default api;