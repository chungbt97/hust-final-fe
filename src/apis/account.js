import { API_ENDPOINT } from '../constants/index';
import axiosService from '../commons/Service/axiosService';

export const signInAccount = data => {
    return axiosService.post(`${API_ENDPOINT}/account/sign-in`, data);
};

export const signUpAccount = data => {
    const urlApi = `${API_ENDPOINT}/account/sign-up`;
    return axiosService.post(urlApi, data);
};
