// api.js
import axios from 'axios';
import { deleteAuthToken, getAuthToken } from './auth';
import { BACKEND_API_URL } from '@/constants/config';

const axiosRequest = axios.create({
   baseURL: `${BACKEND_API_URL}/api`,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosRequest.interceptors.request.use(
   (config) => {
      const token = getAuthToken();
      if (token) {
         config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
   },
   (error) => {
      return Promise.reject(error);
   },
);

axiosRequest.interceptors.response.use(
   async (res) => {
      return res;
   },
   async (error) => {
      if (error.response.data.status === 403) {
         deleteAuthToken();
         window.location.href = '/admin';
      }

      return Promise.reject(error?.response?.data);
   },
);

export default axiosRequest;
