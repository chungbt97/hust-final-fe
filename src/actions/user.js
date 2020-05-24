import * as types from '../constants/user';

export const callApiFetchUser = data => {
    return {
        type: types.API_FETCH_USER,
        payload: data,
    };
};

export const fetchUser = data => {
    return {
        type: types.FETCH_USER,
        payload: data,
    };
};

export const callApiSendMessage = data => {
    return {
        type: types.API_SEND_MESSAGE,
        payload: data,
    };
};

export const sendMessage = data => {
    return {
        type: types.SEND_MESSAGE,
        payload: data,
    };
};
