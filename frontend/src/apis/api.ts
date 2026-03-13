import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

console.log('api instamce...')
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers:{
        "Content-Type":"application/json"
    }

});


    api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired. Logging out...");

      localStorage.removeItem("token");
      window.location.href = "/login";
        toast.error('Token expired. Logging out...')

    }

    return Promise.reject(error);
  }
);

export default api;