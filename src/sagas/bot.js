import { call, put } from '@redux-saga/core/effects';
import * as botActions from '../actions/bot';
import * as modalActions from '../actions/modal';
import * as botApis from '../apis/bot';
import { STATUS_RESPONSE } from '../constants/index';
import history from '../containers/App/history';
import { toastMsgError } from '../commons/Toastify';

export function* getDataBot({ payload }) {
    const { botId } = payload;
    const resp = yield call(botApis.getDataBot, { botId });
    const { status, data, message } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.getDataBot(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* fetchBot({ payload }) {
    const { newBotId } = payload;
    const resp = yield call(botApis.getListBot, { newBotId });
    const { status, data } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        yield put(botActions.fetchListBotSuccess(data));
    } else {
        yield put(botActions.fetchListBotFaild());
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}
