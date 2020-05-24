import { call, put } from '@redux-saga/core/effects';
import * as userApis from '../apis/user';
import * as userAction from '../actions/user';
import { toastMsgError, toastSuccess } from '../commons/Toastify';
import { STATUS_RESPONSE } from '../constants/index';

export function* fetchUser({ payload }) {
    const { botId, name, value, query } = payload;
    const resp = yield call(userApis.fetchUser, { botId, name, value, query });
    const { status, message, data } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        yield put(userAction.fetchUser(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
    }
}

export function* sendMessage({ payload }) {
    const { botId, blockId, recipientId, sendText, text } = payload;
    console.log(payload);
    let resp = yield call(userApis.sendMessage, {
        botId,
        blockId,
        recipientId,
        sendText,
        text,
    });
    const { status, message } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        toastSuccess('Gửi thành công');
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
    }
}
