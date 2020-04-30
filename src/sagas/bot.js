import { call, put } from '@redux-saga/core/effects';
import * as botActions from '../actions/bot';
import * as modalActions from '../actions/modal';
import * as botApis from '../apis/bot';
import { STATUS_RESPONSE } from '../constants/index';
import history from '../containers/App/history';

export function* fetchBot() {
    const resp = yield call(botApis.getListBot);
    const { status, data } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.fetchListBotSuccess(data));
    } else {
        yield put(botActions.fetchListBotFaild());
        if(status === STATUS_RESPONSE.UNAUTHORIZED){
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* addNewBot({ payload }) {
    let { bot } = payload;
    let resp = yield call(botApis.addNewBot, bot);
    let { status, data } = resp.data;
    if (STATUS_RESPONSE.CREATED === status) {
        yield put(botActions.addNewBotSuccess(data));
        yield put(modalActions.hideModal());
    } else {
        yield put(botActions.addNewBotFaild());
        if(status === STATUS_RESPONSE.UNAUTHORIZED){
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* deleteBot({ payload }) {
    let { id, name } = payload;
    let resp = yield call(botApis.deleteBot, id);
    let { status } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.deleteBotSuccess(id, name));
        yield put(modalActions.hideModal());
    } else {
        yield put(botActions.deleteBotFaild());
        if(status === STATUS_RESPONSE.UNAUTHORIZED){
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* updateBot({ payload }) {
    const { bot } = payload;
    const { _id } = bot;
    const resp = yield call(botApis.updateBot, _id, bot);
    let { status, data } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.updateBotSuccess(data));
        yield put(modalActions.hideModal());
    } else {
        yield put(botActions.updateBotFaild(data));
        if(status === STATUS_RESPONSE.UNAUTHORIZED){
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}
