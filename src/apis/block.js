import axios from 'axios';
import { API_ENDPOINT } from '../constants/index';

// APi_ENDPOINT/bots/:botId/group
// APi_ENDPOINT/bots/:botId/group/:groupId
export const getAllGroup = data => {
    const { botId, keySearch } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        url: `${API_ENDPOINT}/bots/${botId}/group?key=${keySearch}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },

    };
    return axios(options);
};

export const updateName = data => {
    const { botId, name, groupId } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'PUT',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { name },
    };
    return axios(options);
};

export const deleteGroup = data => {
    const { botId, groupId } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const addNewGroup = data => {
    const { botId, name } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        url: `${API_ENDPOINT}/bots/${botId}/group`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { name },
    };
    return axios(options);
};

export const addBlockDefault = data => {
    const { botId, groupId, name } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}/block`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { name },
    };
    return axios(options);
};

export const getContentBlock = data => {
    const { botId, groupId, blockId } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}/block/${blockId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const deleteBlock = data => {
    const { botId, groupId, blockId } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}/block/${blockId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const addElemnet = data => {
    const { blockId, element_type, preId } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        url: `${API_ENDPOINT}/bots/block/${blockId}/element`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { element_type, preId },
    };
    return axios(options);
};

export const uploadImageToServer = data => {
    const { file } = data;
    let token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);
    const options = {
        method: 'POST',
        url: `${API_ENDPOINT}/bots/image`,
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form-data',
        },
        data: formData,
    };
    return axios(options);
};

export const deleteElement = data => {
    const { botId, groupId, blockId, elementId } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'DELETE',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}/block/${blockId}/element/${elementId}`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    return axios(options);
};

export const updateElements = data => {
    const { botId, groupId, blockId, elements, name } = data;
    let token = localStorage.getItem('token');
    const options = {
        method: 'PUT',
        url: `${API_ENDPOINT}/bots/${botId}/group/${groupId}/block/${blockId}/elements`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        data: { name, elements },
    };
    return axios(options);
};
