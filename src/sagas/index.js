import { call, put, takeEvery, takeLatest } from '@redux-saga/core/effects';
import * as botActions from '../actions/bot';
import * as modalActions from '../actions/modal';
import * as botApis from '../apis/bot';
import * as botActionTypes from '../constants/bot';
import { STATUS_RESPONSE } from '../constants/index';

export function* fetchBot() {
    const resp = yield call(botApis.getListBot);
    const { status, data } = resp;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.fetchListBotSuccess(data));
    } else {
        yield put(botActions.fetchListBotFaild());
    }
}

export function* addNewBot({ payload }) {
    let { bot } = payload;
    let resp = yield call(botApis.addNewBot, bot);
    let { status, data } = resp;
    if (STATUS_RESPONSE.CREATED === status) {
        yield put(botActions.addNewBotSuccess(data));
        yield put(modalActions.hideModal());
    } else {
        yield put(botActions.addNewBotFaild());
    }
}

export function* deleteBot({ payload }) {
    let { id, name } = payload;
    let resp = yield call(botApis.deleteBot, id);
    let { status } = resp;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.deleteBotSuccess(id, name));
        yield put(modalActions.hideModal());
    } else {
        yield put(botActions.deleteBotFaild());
    }
}

function* updateBot({ payload }) {
    const { bot } = payload;
    const { id } = bot;
    const resp = yield call(botApis.updateBot, id, bot);
    if (resp.status === STATUS_RESPONSE.OK) {
        yield put(botActions.updateBotSuccess(resp.data));
        yield put(modalActions.hideModal());
    } else {
        yield put(botActions.updateBotFaild(resp.data));
    }
}

function* rootSaga() {
    yield takeLatest(botActionTypes.FETCH_BOT, fetchBot);
    yield takeEvery(botActionTypes.DELETE_BOT, deleteBot);
    yield takeEvery(botActionTypes.ADD_BOT, addNewBot);
    yield takeEvery(botActionTypes.UPDATE_BOT, updateBot);
}

export default rootSaga;
