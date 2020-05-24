import * as toastNotify from '../commons/Toastify';
import * as types from '../constants/bot';

export const callApiGetDataBot = data => {
    return {
        type: types.API_GET_DATA_BOT,
        payload: data,
    };
};

export const getDataBot = data => {
    return {
        type: types.GET_DATA_BOT,
        payload: data,
    };
};

export const fetchAllBots = data => {
    return {
        type: types.FETCH_BOT,
        payload: data,
    };
};

/**
 * Lấy ra type khi thành công
 * @param {dữ liệu trả về} data :
 */
export const fetchListBotSuccess = data => {
    return {
        type: types.FETCH_BOT_SUCCESS,
        payload: {
            data,
        },
    };
};
/**
 * trả ra dữ liệu khi lỗi
 * @param {Nội dung lỗi} error
 */
export const fetchListBotFaild = error => {
    toastNotify.toastError(error);
    return {
        type: types.FETCH_BOT_FAILED,
        payload: {
            error,
        },
    };
};

/**
 * Delete bot
 * @param { bot} bot
 */
export const deleteBot = (id, name) => {
    return {
        type: types.DELETE_BOT,
        payload: {
            id,
            name,
        },
    };
};
/**
 * confirm that user want to delete bot
 * @param {bot} bot
 */
export const confirmDeleteBot = bot => {
    return {
        type: types.DELETE_CONFIRM,
        payload: {
            bot,
        },
    };
};
/**
 * Delete success
 * @param {id of bot} id
 */
export const deleteBotSuccess = (id, name) => {
    toastNotify.toastSuccess('Xóa ' + name + ' thành công!');
    return {
        type: types.DELETE_BOT_SUCCESS,
        payload: {
            id,
        },
    };
};

/**
 * Something wrong on server
 * @param {error} error
 */
export const deleteBotFaild = error => {
    toastNotify.toastError(error);
    return {
        type: types.DELETE_BOT_FAILD,
        payload: {
            error,
        },
    };
};
