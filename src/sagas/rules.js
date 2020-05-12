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
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* addRule({ payload }) {
    const { botId, keyword, blocks } = payload;
    const resp = yield call(ruleApis.addRule, {
        botId,
        keyword,
        blocks,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.CREATED) {
        toastSuccess('Created new rule successfully');
        yield put(ruleActions.addRule(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* updateRule({ payload }) {
    const { botId, keyword, blocks, ruleId } = payload;
    const resp = yield call(ruleApis.updateRule, {
        botId,
        keyword,
        blocks,
        ruleId,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        toastSuccess('Update rule successfully');
        yield put(ruleActions.updateRule(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
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
    console.log(resp);
    if (status === STATUS_RESPONSE.OK) {
        toastSuccess('Delete rule successfully');
        yield put(ruleActions.deleteRule(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* searchRule({ payload }) {
    yield delay(1000);
    const { botId, keyword } = payload;
    const resp = yield call(ruleApis.fetchRule, {
        botId,
        keyword,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(ruleActions.fetchRules(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}
