import * as types from '../constants/account';
import { toastError } from '../commons/Toastify';
const initialState = {
    firstName: '',
    lastName: '',
    userEmail: '',
    password: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SIGN_IN_ACCOUNT: {
            return {
                ...state,
            };
        }
        case types.SIGN_UP_ACCOUNT: {
            return {
                ...state,
            };
        }
        case types.ERROR: {
            const { error } = action.payload;
            toastError(error.message);
            return {
                ...state,
                firstName: '',
                lastName: '',
                userEmail: '',
                password: '',
            };
        }
        default:
            return state;
    }
};
export default reducer;
