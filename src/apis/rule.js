import axios from 'axios';
import { API_ENDPOINT } from '../constants/index';

export const fetchRule = data => {
    const { botId, keyword } = data;
    let token = localStorage.getItem('token');
    const options = {
        url: `${API_ENDPOINT}/bots/${botId}/rule?keySearch=${keyword}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const addRule = data => {
    const { botId, keyword, blocks, name } = data;
    let token = localStorage.getItem('token');
    const options = {
        url: `${API_ENDPOINT}/bots/${botId}/rule`,
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { keyword, blocks, name },
    };
    return axios(options);
};

export const updateRule = data => {
    const { botId, keyword, blocks, ruleId, name } = data;
    let token = localStorage.getItem('token');
    const options = {
        url: `${API_ENDPOINT}/bots/${botId}/rule/${ruleId}`,
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { keyword, blocks, name },
    };
    return axios(options);
};

export const deleteRule = data => {
    const { botId, ruleId } = data;
    let token = localStorage.getItem('token');
    const options = {
        url: `${API_ENDPOINT}/bots/${botId}/rule/${ruleId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};
