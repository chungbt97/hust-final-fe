import axiosService from '../commons/Service/axiosService';
import { API_ENDPOINT } from '../constants/index';

//  http://localhost:3000/bots
const url = 'bots';

export const getListBot = () => {
    return axiosService.get(`${API_ENDPOINT}/${url}`);
};

export const addNewBot = data => {
    return axiosService.post(`${API_ENDPOINT}/${url}`, data);
};

export const updateBot = (id, data) => {
    return axiosService.put(`${API_ENDPOINT}/${url}/${id}`, data);
};

export const deleteBot = id => {
    return axiosService.delete(`${API_ENDPOINT}/${url}/${id}`);
};
