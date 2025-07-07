import axios from "axios";
import { errorToast, sucessToast } from "../components/Toasters/Toasters";

const checkBackendConnection = async (options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    timeout = 10000,
    showsucessToast = false,
    endpoint = '/'
  } = options;

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  
  if (!backendURL) {
    errorToast('Backend URL not configured!');
    return;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Attempting to connect to server (${attempt}/${maxRetries})...`);
      
      const response = await axios.get(`${backendURL}${endpoint}`, {
        timeout,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('✅ Backend connection successful');
        
        if (showsucessToast) {
          sucessToast('Connected to server successfully!');
        }
        
        return;
      }

    } catch (error) {
      console.error(`❌ Connection attempt ${attempt} failed:`, error.message);
      
      if (attempt === maxRetries) {
        handleConnectionError(error);
        return;
      }
      // Wait before retrying (except for the last attempt)
      if (attempt < maxRetries) {
        console.log(`⏳ Retrying in ${retryDelay}ms...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
    }
  }

  return console.warn("Max Retry Exceeded");
};

const handleConnectionError = (error) => {
  if (error.code === 'ECONNABORTED') {
    errorToast('Server connection timeout! Please try again.');
  } else if (error.response?.status >= 500) {
    errorToast(`Server error: ${error.response.status}. Please try again later.`);
  } else if (error.response?.status >= 400) {
    errorToast(`Client error: ${error.response.status}. Please check your request.`);
  } else if (error.request) {
    errorToast('Unable to reach server! Please check your internet connection.');
  } else {
    errorToast('Connection error! Please try again.');
  }
};

export default checkBackendConnection;