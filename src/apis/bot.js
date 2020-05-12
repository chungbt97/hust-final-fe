import axios from 'axios';
import { API_ENDPOINT } from '../constants/index';

//  http://localhost:3000/bots
const url = 'bots';

export const getListBot = () => {
    let token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        url: `${API_ENDPOINT}/${url}`,
    };
    return axios(options);
};

export const addNewBot = data => {
    let token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        url:  `${API_ENDPOINT}/${url}`,
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const updateBot = (id, data) => {
    let token = localStorage.getItem('token');
    const options = {
        method: 'PUT',
        url:  `${API_ENDPOINT}/${url}/${id}`,
        data,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const deleteBot = id => {
    let token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        url:  `${API_ENDPOINT}/${url}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};
