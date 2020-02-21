import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import blockReducer from './block';
import uiReducer from './ui';
import modalReducer from './modal';
import botReducer from './bot';

const rootReducer = combineReducers({
    form: formReducer,
    block: blockReducer,
    ui: uiReducer,
    modal: modalReducer,
    bot: botReducer,
});

export default rootReducer;
