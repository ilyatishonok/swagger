import axios  from 'axios';
import store from '../store';

axios.interceptors.response.use(undefined, (error) => {
    if (error.response === 401) {
        localStorage.removeItem('access_token');
    }

    return Promise.reject(error);
});

export const api = axios.create({
    baseURL: 'https://jogtracker.herokuapp.com/api/v1/',
});

api.interceptors.response.use(undefined, (error) => {
    if (error.response === 401) {
        localStorage.removeItem('access_token');
    }

    return Promise.reject(error);
});

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        config.headers.common = {
            'Authorization': `Bearer ${accessToken}`,
        }
    }

    return config;
})
