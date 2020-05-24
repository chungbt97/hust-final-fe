import * as uiTypes from '../constants/ui';
const initialState = {
    sidbarOpen: true,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case uiTypes.SHOW_SIDEBAR:
            return {
                ...state,
                sidbarOpen: true,
            };
        case uiTypes.HIDE_SIDEBAR:
            return {
                ...state,
                sidbarOpen: false,
            };
        case uiTypes.SHOW_LOADING:
            return {
                ...state,
                loading: true,
            };
        case uiTypes.HIDE_LOADING:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default reducer;
