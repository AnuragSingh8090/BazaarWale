import axios from "axios";
import Store from '../store/Store.js'
import { updateToken, logoutUser } from "../store/slices/userSlice";
import { errorToast } from "../components/Toasters/Toasters";


const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 20000
});

// Plain axios instance (no interceptors) used ONLY for refresh-token calls
// so that a 401 on the refresh endpoint doesn't trigger another refresh cycle.
const plainAxios = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    timeout: 10000
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
        if (error.code === "ECONNABORTED") {
            errorToast("Server is busy please try again after some time")
            return Promise.reject(error)
        }

        else if (status === 401 && error.response.data.code === "LOGOUT_USER") {
            return Promise.reject(error)
        }

        else if (status === 401 && !originalRequest._retry) {
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
                // Use plainAxios so a 401 here does NOT trigger the interceptor again
                const response = await plainAxios.post(
                    `/api/user/auth/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                const token = response.data.token;
                Store.dispatch(updateToken(token))
                return token;
            }
            catch (error) {
                Store.dispatch(logoutUser())
                throw error; // must rethrow so the response interceptor's catch block also fires
            }
            finally {
                refreshPromise = null; // reset so the next expiry can start a fresh refresh cycle
            }
        })();
    }
    return refreshPromise;
}

export default api;