import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import blockReducer from './block';
import uiReducer from './ui';

const rootReducer = combineReducers({
    form: formReducer,
    block: blockReducer,
    ui: uiReducer,
});

export default rootReducer;
