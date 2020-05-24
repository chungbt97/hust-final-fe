import axios from 'axios';
import { API_ENDPOINT } from '../constants/index';

export const fetchUser = data => {
    const { botId, name, value, query } = data;
    let token = localStorage.getItem('token');
    let params = null;
    if (name !== '' && query !== '') {
        params = {
            attr: name,
            value,
            query,
        };
    } else {
        params = {
            attr: '',
            value: '',
            query,
        };
    }
    const options = {
        url: `${API_ENDPOINT}/bots/${botId}/user`,
        method: 'GET',
        params,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const sendMessage = data => {
    const { botId, blockId, recipientId, sendText, text } = data;
    console.log(data);
    let token = localStorage.getItem('token');
    const options = {
        url: `${API_ENDPOINT}/bots/${botId}/user`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { blockId, recipientId, sendText, text },
    };
    return axios(options);
};
