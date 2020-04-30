import { call } from '@redux-saga/core/effects';
import * as accountApis from '../apis/account';
import { toastMsgError, toastSuccess } from '../commons/Toastify';
import { STATUS_RESPONSE } from '../constants/index';
import history from '../containers/App/history';

export function* signUpAccount({ payload }) {
    const resp = yield call(accountApis.signUpAccount, payload.data);
    const { status, message } = resp.data;
    if (STATUS_RESPONSE.CREATED === status) {
        toastSuccess('Account is' + message);
        history.push('/sign-in');
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
    }
}

export function* signInAccount({ payload }) {
    const resp = yield call(accountApis.signInAccount, payload.data);
    const { status, message } = resp.data;
    if (STATUS_RESPONSE.OK === status) {
        window.localStorage.setItem('token', resp.data.access_token);
        history.push('/');
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);

    }
}
