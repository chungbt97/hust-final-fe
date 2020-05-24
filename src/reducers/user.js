import * as types from '../constants/user';

const initialState = {
    listUser: [],
    listBlock: [],
    listData: [],
    listAttr: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USER: {
            const { listUser, listBlock, listData, listAttr } = action.payload;
            return {
                ...state,
                listUser,
                listBlock,
                listData,
                listAttr,
            };
        }
        case types.SEND_MESSAGE: {
            return {
                ...state,
            };
        }

        default:
            return state;
    }
};
export default reducer;
