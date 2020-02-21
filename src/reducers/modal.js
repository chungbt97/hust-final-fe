import * as types from '../constants/modal';

const initialState = {
    open: false,
    content: null,
    title: '',
    typeModal: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SHOW_MODAL: {
            const { type } = action.payload;
            return {
                ...state,
                open: true,
                typeModal: type,
            };
        }
        case types.HIDE_MODAL:
            return {
                ...state,
                open: false,
                title: '',
                typeModal: null,
            };
        case types.CHANGE_TITLE: {
            const { title } = action.payload;
            return {
                ...state,
                title: title,
            };
        }
        case types.CHANGE_CONTENT: {
            const { content } = action.payload;
            return {
                ...state,
                content: content,
            };
        }
        default:
            return state;
    }
};
export default reducer;
