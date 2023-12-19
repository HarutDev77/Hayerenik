// api.js
import axios from 'axios';
import {deleteAuthToken, getAuthToken} from './auth';
import { BACKEND_API_URL } from "@/constants/config";

const axiosRequest = axios.create({
    baseURL: BACKEND_API_URL,
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
    }
);

axiosRequest.interceptors.response.use(
    async (res) => {
        if (res.data.status === 401) {
            deleteAuthToken()
            window.location.href = '/'
        }

        return res
    },
    async (error) => {
        return Promise.reject(error)
    }
)

export default axiosRequest;