import axios from 'axios';
import { API_ENDPOINT } from '../constants/index';

const url = 'bots';

export const getDataBot = data => {
    let { botId } = data;
    let token = localStorage.getItem('token');
    let options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: data,
        url: `${API_ENDPOINT}/${url}/${botId}`,
    };
    return axios(options);
};

export const getListBot = data => {
    let token = localStorage.getItem('token');
    let options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: data,
        url: `${API_ENDPOINT}/${url}`,
    };
    return axios(options);
};
export const deleteBot = id => {
    let token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        url: `${API_ENDPOINT}/${url}/${id}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};
