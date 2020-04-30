import * as types from '../constants/account';



/**
 * Đăng kí
 * @param {dữ liệu trả về} data :
 */
export const signUpAccount = data => {
    return {
        type: types.SIGN_UP_ACCOUNT,
        payload: {
            data,
        },
    };
};

/**
 * Đăng nhập
 * @param {dữ liệu trả về} data :
 */
export const signInAccount = data => {
    return {
        type: types.SIGN_IN_ACCOUNT,
        payload: {
            data,
        },
    };
};
