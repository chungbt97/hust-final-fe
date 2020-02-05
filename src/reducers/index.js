import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import blockReducer from './block';

const rootReducer = combineReducers({
    form: formReducer,
    block: blockReducer,
});

export default rootReducer;
