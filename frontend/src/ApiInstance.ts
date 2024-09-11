import axios, { AxiosInstance } from 'axios';

// Client Side Api Instance
const apiInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Server Side Api Instance
export const apiInstanceSS: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export default apiInstance;