import { toastError } from '../commons/Toastify';
import * as types from '../constants/bot';

const initialState = {
    listBot: [],
    botDelete: null,
    botEdit: 'null',
    botSelected: null,
    totalFollowers: -1,
    totalRules: -1,
    totalBlocks: -1,
    totalSession: -1,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_BOT: {
            return {
                ...state,
                listBot: [],
            };
        }
        case types.FETCH_BOT_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listBot: data,
            };
        }
        case types.FETCH_BOT_FAILED: {
            return {
                ...state,
                listBot: [],
            };
        }
        case types.DELETE_BOT: {
            return {
                ...state,
            };
        }
        case types.DELETE_CONFIRM: {
            const { bot } = action.payload;
            return {
                ...state,
                botDelete: bot,
            };
        }
        case types.DELETE_BOT_SUCCESS: {
            const { id } = action.payload;
            const { listBot } = state;
            const newList = listBot.filter(bot => {
                return bot._id !== id;
            });
            return {
                ...state,
                listBot: [...newList],
                botDelete: null,
            };
        }
        case types.DELETE_BOT_FAILD: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                botDelete: null,
            };
        }
        case types.GET_DATA_BOT: {
            const {
                bot,
                totalFollowers,
                totalRules,
                totalBlocks,
                totalSession,
            } = action.payload;

            return {
                ...state,
                botSelected: bot,
                totalFollowers,
                totalRules,
                totalBlocks,
                totalSession,
            };
        }
        default:
            return state;
    }
};
export default reducer;
