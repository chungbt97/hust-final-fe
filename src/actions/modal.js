import * as types from '../constants/modal';

export const showModal = type => {
    return {
        type: types.SHOW_MODAL,
        payload:{
            type
        }
    };
};

export const hideModal = () => {
    return {
        type: types.HIDE_MODAL,
    };
};

export const changeTitle = title => {
    return {
        type: types.CHANGE_TITLE,
        payload: {
            title,
        },
    };
};

export const changeContent = content => {
    return {
        type: types.CHANGE_CONTENT,
        payload: {
            content,
        },
    };
};

