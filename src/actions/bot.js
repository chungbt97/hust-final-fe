import * as types from '../constants/bot';
import * as toastNotify from '../commons/Toastify';
import * as messageConstants from '../constants/Messages';

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
 * Add new bot to list bot
 * @param {new bot} bot
 */
export const addNewBot = bot => {
    return {
        type: types.ADD_BOT,
        payload: {
            bot,
        },
    };
};
/**
 * Created
 * @param {bot} data
 */
export const addNewBotSuccess = data => {
    toastNotify.toastSuccess(messageConstants.CREATE_BOT_DONE);
    return {
        type: types.ADD_BOT_SUCCESS,
        payload: {
            data,
        },
    };
};
/**
 * Something wrong on server
 * @param {error from serrver} error
 */
export const addNewBotFaild = error => {
    toastNotify.toastError(error);
    return {
        type: types.ADD_BOT_FAILD,
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
/**
 * Editbot
 * @param {bot} bot
 */
export const updateBot = bot => {
    return {
        type: types.UPDATE_BOT,
        payload: {
            bot,
        },
    };
};
/**
 * Update done
 * @param {bot} bot
 */
export const updateBotSuccess = bot => {
    return {
        type: types.UPDATE_BOT_SUCCESS,
        payload: {
            bot,
        },
    };
};
/**
 * Somethong wrong
 * @param {error} error
 */
export const updateBotFaild = error => {
    return {
        type: types.UPDATE_BOT_FAILD,
        payload: {
            error,
        },
    };
};
