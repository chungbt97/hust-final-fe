import * as ruleApis from '../apis/rule';
import * as ruleActions from '../actions/rule';
import { call, put, delay } from '@redux-saga/core/effects';
import { toastMsgError, toastSuccess } from '../commons/Toastify';
import { STATUS_RESPONSE } from '../constants/index';
import history from '../containers/App/history';

export function* fetchRule({ payload }) {
    const { botId } = payload;
    const resp = yield call(ruleApis.fetchRule, {
        botId,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(ruleActions.fetchRules(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* addRule({ payload }) {
    const { botId, keyword, blocks, name } = payload;
    const resp = yield call(ruleApis.addRule, {
        botId,
        keyword,
        blocks,
        name
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.CREATED) {
        toastSuccess('Tạo luật mới thành công!');
        yield put(ruleActions.addRule(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* updateRule({ payload }) {
    const { botId, keyword, blocks, ruleId, name } = payload;
    const resp = yield call(ruleApis.updateRule, {
        botId,
        keyword,
        blocks,
        ruleId,
        name
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        toastSuccess('Đã cập nhật luật thành công!');
        yield put(ruleActions.updateRule(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* deleteRule({ payload }) {
    const { botId, ruleId } = payload;
    const resp = yield call(ruleApis.deleteRule, {
        botId,
        ruleId,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        toastSuccess('Xóa thành công!');
        yield put(ruleActions.deleteRule(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* searchRule({ payload }) {
    yield delay(600);
    const { botId, keyword } = payload;
    const resp = yield call(ruleApis.fetchRule, {
        botId,
        keyword,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(ruleActions.fetchRules(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}
