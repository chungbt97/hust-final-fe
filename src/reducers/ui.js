import * as uiTypes from '../constants/ui';
const initialState = {
    sidbarOpen: true,
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
        default:
            return state;
    }
};
export default reducer;
