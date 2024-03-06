import axios from 'axios';
import { BACKEND_API_URL } from '@/constants/config';

export const axiosFront = axios.create({
   baseURL: `${BACKEND_API_URL}/api`,
   withCredentials: true,
   headers: {
      'Content-Type': 'application/json',
   },
});

axiosFront.interceptors.response.use(
   async (res) => {
      return res.data.resData;
   },
   async (error) => {
      return Promise.reject(error?.response?.data);
   },
);
