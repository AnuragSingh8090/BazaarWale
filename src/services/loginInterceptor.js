import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser, loginStart, updateToken } from "../store/slices/userSlice";
import apiService from "./apiService";
import { errorToast } from "../components/Toasters/Toasters";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

// Configure axios defaults
axios.defaults.withCredentials = true;

const useLoginInterceptor = () => {
  const dispatch = useDispatch();
  const requestInterceptorRef = useRef(null);
  const responseInterceptorRef = useRef(null);
  const isRefreshing = useRef(false);
  const failedQueue = useRef([]);

  const processQueue = (error, token = null) => {
    failedQueue.current.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue.current = [];
  };

  const getTokenExpiry = (token) => {
    try {
      if (!token) return null;
      const decoded = jwtDecode(token);
      return decoded?.exp || null;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    let refreshTimer = null;

    // Request interceptor - automatically attach Authorization header
    requestInterceptorRef.current = axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("userToken");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle token refresh on 401
    responseInterceptorRef.current = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const errMessage = error.response?.data?.message;
        const statusCode = error.response?.status;

        const isTokenError = 
          statusCode === 401 ||
          errMessage === "Token Expired" ||
          errMessage === "Unauthorized" ||
          errMessage === "Invalid Token" ||
          errMessage === "jwt expired" ||
          errMessage === "jwt malformed" ||
          errMessage === "Token is required";

        if (isTokenError && !originalRequest._retry) {
          if (isRefreshing.current) {
            return new Promise((resolve, reject) => {
              failedQueue.current.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
              return axios(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing.current = true;

          try {
            const result = await handleTokenRefresh();

            if (result.success) {
              originalRequest.headers['Authorization'] = 'Bearer ' + result.token;
              processQueue(null, result.token);
              isRefreshing.current = false;
              return axios(originalRequest);
            } else {
              processQueue(result.error, null);
              isRefreshing.current = false;
              return Promise.reject(result.error);
            }
          } catch (refreshError) {
            processQueue(refreshError, null);
            isRefreshing.current = false;
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );

    const handleTokenRefresh = async (signal = null) => {
      try {
        const response = await apiService.refreshToken(signal);
        
        if (response?.token) {
          const newToken = response.token;
          const newTokenExpiry = getTokenExpiry(newToken);
          
          localStorage.setItem("userToken", newToken);
          dispatch(updateToken({ token: newToken, tokenExpiry: newTokenExpiry }));
          setupTokenRefreshTimer(newToken);
          
          return { success: true, token: newToken, tokenExpiry: newTokenExpiry };
        } else {
          throw new Error("No token in refresh response");
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Token refresh failed:", error);
          errorToast("Session expired. Please login again.");
          dispatch(logoutUser());
        }
        return { success: false, error };
      }
    };

    const setupTokenRefreshTimer = (token) => {
      if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
      }

      const tokenExpiry = getTokenExpiry(token);
      if (!tokenExpiry) {
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = tokenExpiry - currentTime;
      
      const refreshBuffer = 60;
      const timeUntilRefresh = timeUntilExpiry - refreshBuffer;

      if (timeUntilRefresh > 0) {
        refreshTimer = setTimeout(() => {
          refreshTokenNow();
        }, timeUntilRefresh * 1000);
      } else if (timeUntilExpiry > 0) {
        refreshTokenNow();
      }
    };

    const refreshTokenNow = async () => {
      await handleTokenRefresh(abortController.signal);
    };


    const validateToken = async () => {
      const token = localStorage.getItem("userToken");

      if (!token) {
        dispatch(logoutUser());
        return;
      }

      const tokenExpiry = getTokenExpiry(token);
      if (!tokenExpiry) {
        errorToast("Invalid token format.");
        dispatch(logoutUser());
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const isExpired = tokenExpiry <= currentTime;

      if (isExpired) {
        const result = await handleTokenRefresh(abortController.signal);
        if (result.success) {
          await fetchBasicUserData(abortController.signal, result.token, result.tokenExpiry);
        }
        return;
      }

      await fetchBasicUserData(abortController.signal, token, tokenExpiry);
      setupTokenRefreshTimer(token);
    };

    const fetchBasicUserData = async (signal, token, tokenExpiry) => {
      try {
        dispatch(loginStart());
        const response = await apiService.getBasicUserData(signal);
        
        if (response?.user) {
          const { name, email, userId, cart } = response.user;
          dispatch(loginUser({ 
            name, 
            email, 
            userId, 
            cart, 
            token,
            tokenExpiry 
          }));
        } else {
          errorToast("Failed to get user data.");
          dispatch(logoutUser());
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error("Fetch user data failed:", error);
        }
      }
    };

    validateToken();

    return () => {
      abortController.abort();
      if (refreshTimer) {
        clearTimeout(refreshTimer);
      }
      if (requestInterceptorRef.current !== null) {
        axios.interceptors.request.eject(requestInterceptorRef.current);
      }
      if (responseInterceptorRef.current !== null) {
        axios.interceptors.response.eject(responseInterceptorRef.current);
      }
    };
  }, [dispatch]);
};

export default useLoginInterceptor;
