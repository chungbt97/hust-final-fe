import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import blockReducer from './block';
import uiReducer from './ui';
import modalReducer from './modal';
import botReducer from './bot';
import accountReducer from './account';
import ruleReducer from './rule';
import userReducer from './user';

const rootReducer = combineReducers({
    form: formReducer,
    block: blockReducer,
    ui: uiReducer,
    modal: modalReducer,
    bot: botReducer,
    account: accountReducer,
    rule: ruleReducer,
    user: userReducer,
});

export default rootReducer;
