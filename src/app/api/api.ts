import axios from 'axios';
import { getCookie } from 'cookies-next'

export const backend = process.env.NEXT_PUBLIC_API_URL;


export const api = axios.create({
    baseURL: backend,
});

export const AuthApi = axios.create({
    baseURL: backend,
    headers: {
        Authorization: `Bearer ${getCookie('token')}`,
    },
});




