
import axios from "axios";
import { errorToast } from "../components/Toasters/Toasters";
import store from "../store/Store";
import { logoutUser } from "../store/slices/userSlice";

const getAuthHeaders = () => {
  const token = localStorage.getItem("userToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleError = (error) => {
  const errMessage = error.response?.data?.message;

  if (
    errMessage === "Token Expired" ||
    errMessage === "Unauthorized" ||
    errMessage === "Invalid Token" ||
    errMessage === "jwt expired" ||
    errMessage === "Token is required"
  ) {
    errorToast("Session Expired. Please login again.");
    store.dispatch(logoutUser()); 
  }

  throw error;
};

const apiService = {
  getBasicUserData: async (signal = null) => {
    try {
      const headerData = signal ? { headers: getAuthHeaders(), signal } : { headers: getAuthHeaders() };
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/userdatabasic`,headerData
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  loginUser: async (data, signal = null) => {
    try {
      const headerData = signal ? { headers: getAuthHeaders(), signal } : { headers: getAuthHeaders() };
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data, headerData
      );
      return response.data;
    } catch (error) {
      handleError(error);
    }
  },

  
};

export default apiService;
