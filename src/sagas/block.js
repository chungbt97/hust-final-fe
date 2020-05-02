import { call, put } from '@redux-saga/core/effects';
import * as blockAction from '../actions/block';
import * as blockApis from '../apis/block';
import { toastMsgError, toastSuccess } from '../commons/Toastify';
import { STATUS_RESPONSE } from '../constants/index';
import history from '../containers/App/history';

export function* fetchGroup({ payload }) {
    const { botId } = payload;
    const resp = yield call(blockApis.getAllGroup, { botId });
    const { status, data, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.fetchGroupAndBlock(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* updateNameGroup({ payload }) {
    const { botId, name, groupId } = payload;
    const resp = yield call(blockApis.updateName, { botId, name, groupId });
    const { status, data, message } = resp.data;
    console.log(resp.data);
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.updateGroupName(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* deleteGroup({ payload }) {
    const { botId, groupId } = payload;
    const resp = yield call(blockApis.deleteGroup, { botId, groupId });
    const { status, message } = resp.data;

    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.deleteGroup(groupId));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* addGroup({ payload }) {
    const { botId, name } = payload;
    const resp = yield call(blockApis.addNewGroup, { botId, name });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.CREATED) {
        toastSuccess('Create: ' + data.name + ' done');
        yield put(blockAction.addGroup(data));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* addBlock({ payload }) {
    const { botId, groupId, name } = payload;
    const resp = yield call(blockApis.addBlockDefault, {
        botId,
        groupId,
        name,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.CREATED) {
        toastSuccess('Create new block done');
        let { newBlock } = data;
        yield put(blockAction.addBlock({ groupId, block: newBlock }));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* deleteBlock({ payload }) {
    const { botId, groupId, blockId } = payload;
    const resp = yield call(blockApis.deleteBlock, { botId, groupId, blockId });
    const { status, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.deleteBlock({ groupId, blockId, botId }));
        history.push(`/admin/dashboard/chatbot/${botId}`);
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* fetchElement({ payload }) {
    const { botId, groupId, blockId } = payload;
    const resp = yield call(blockApis.getContentBlock, {
        botId,
        groupId,
        blockId,
    });
    const { status, data, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        if (data !== undefined) {
            yield put(blockAction.fetchElements(data));
        } else {
            history.push(`/admin/dashboard/chatbot/${botId}`);
        }
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* addElemnet({ payload }) {
    const { blockId, element_type, preId } = payload;
    const resp = yield call(blockApis.addElemnet, {
        blockId,
        element_type,
        preId,
    });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.CREATED) {
        const { block, newElement } = data;
        yield put(blockAction.addEmptyElemnet({ block, newElement, preId }));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* uploadImageToServer({ payload }) {
    const { file, id, title } = payload;
    const resp = yield call(blockApis.uploadImageToServer, {
        file,
    });
    const { status, message, fileNameInServer } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        let fileName = fileNameInServer.split('\\')[1];
        let filePath = 'http://localhost:8080/bots/image/' + fileName;

        yield put(blockAction.uploadImageSuccess({ filePath, id, title }));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* uploadImageCover({ payload }) {
    const { file, id, title, subtitle } = payload;
    const resp = yield call(blockApis.uploadImageToServer, {
        file,
    });
    const { status, message, fileNameInServer } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        let fileName = fileNameInServer.split('\\')[1];
        let filePath = 'http://localhost:8080/bots/image/' + fileName;
        yield put(
            blockAction.uploadCardSuccess({ filePath, id, title, subtitle }),
        );
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* deleteElement({ payload }) {
    const { botId, groupId, blockId, elementId } = payload;
    const resp = yield call(blockApis.deleteElement, {
        botId,
        groupId,
        blockId,
        elementId,
    });

    const { status, message } = resp.data;

    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.deleteElement({ elementId }));
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}

export function* updateContentBlock({ payload }) {
    const { botId, groupId, blockId, elements, name } = payload;
    const resp = yield call(blockApis.updateContentBlock, {
        botId,
        groupId,
        blockId,
        elements,
        name,
    });
    const { status, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.updateContentSuccess());
    } else {
        toastMsgError('Error - ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.removeItem('token');
            history.push('/sign-in');
        }
    }
}
