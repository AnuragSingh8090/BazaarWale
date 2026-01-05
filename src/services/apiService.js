
import axios from "axios";

const apiService = {
  // Authentication endpoints
  getBasicUserData: async (signal) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/userdatabasic`,
      signal ? { signal } : {}
    );
    return response.data;
  },

  loginUser: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/login`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  registerUser: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/register`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  refreshToken: async (signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/refresh-token`,
      {},
      signal ? { signal } : {}
    );
    return response.data;
  },

  validateResetPasswordEmail: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/validateresetpasswordemail`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  validateResetPasswordOtp: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/validateresetpasswordotp`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  resetPassword: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/auth/resetpassword`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  // User Profile endpoints
  userData: async (signal) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/userdata`,
      signal ? { signal } : {}
    );
    return response.data;
  },

  updateUserProfile: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/update-user-profile`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  changePassword: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/change-password`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  deleteUser: async (signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/delete-user`,
      {},
      signal ? { signal } : {}
    );
    return response.data;
  },

  verifyUserEmail: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/verify-user-email`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  verifyUserEmailOtp: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/verify-user-email-otp`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  manageTwoFactorAuth: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/manage-twofactor-auth`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  manageLoginActivity: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/manage-login-activity`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  addAddress: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/add-address`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  // Contact endpoints
  newsletter: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/contact/newsletter`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },

  contactUs: async (data, signal) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/contact/contact`,
      data,
      signal ? { signal } : {}
    );
    return response.data;
  },
};

export default apiService;