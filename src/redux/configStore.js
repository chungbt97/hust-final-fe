import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              shouldHotReload: false,
          })
        : compose;
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const configStore = () => {
    const middlewares = [sagaMiddleware];
    const enhancers = [applyMiddleware(...middlewares)];
    const store = createStore(rootReducer, composeEnhancers(...enhancers));

    sagaMiddleware.run(rootSaga);

    return store;
};

export default configStore;
