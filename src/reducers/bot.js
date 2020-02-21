import { toastError } from '../commons/Toastify';
import * as types from '../constants/bot';

const initialState = {
    listBot: [],
    botEdit: null,
    botDelete: null,
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
                return bot.id !== id;
            });
            return {
                ...state,
                listBot: [...newList],
                botDelete: null
            };
        }
        case types.DELETE_BOT_FAILD: {
            const { error } = action.payload;
            toastError(error);
            return {
                ...state,
                botDelete: null
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
        case types.CHANGE_BOT_EDIT: {
            const { bot } = action.payload;
            return {
                ...state,
                botEdit: bot,
            };
        }
        case types.UPDATE_BOT_SUCCESS: {
            const { bot } = action.payload;
            let newList = state.listBot.filter(b => {
                return b.id !== bot.id;
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
