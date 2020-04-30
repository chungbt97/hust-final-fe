import { toastError, toastSuccess } from '../commons/Toastify';
import * as types from '../constants/bot';

const initialState = {
    listBot: [],
    botDelete: null,
    botEdit: 'null',
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
        case types.ADD_BOT: {
            return {
                ...state,
            };
        }
        case types.ADD_BOT_SUCCESS: {
            const { data } = action.payload;
            return {
                ...state,
                listBot: [...state.listBot, data],
            };
        }
        case types.ADD_BOT_FAILD: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
            };
        }
        case types.UPDATE_BOT: {
            return {
                ...state,
            };
        }
        case types.UPDATE_BOT_SUCCESS: {
            const { bot } = action.payload;
            toastSuccess('Update bot: ' + bot.name + ' done');
            let newList = state.listBot.filter(b => {
                return b._id !== bot._id;
            });
            return {
                ...state,
                listBot: [...newList, bot],
                botEdit: null,
            };
        }
        case types.UPDATE_BOT_FAILD: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                botEdit: null,
            };
        }
        default:
            return state;
    }
};
export default reducer;
