import { call, put, delay } from '@redux-saga/core/effects';
import * as blockAction from '../actions/block';
import * as blockApis from '../apis/block';
import { toastMsgError, toastSuccess } from '../commons/Toastify';
import { STATUS_RESPONSE } from '../constants/index';
import history from '../containers/App/history';
import { API_ENDPOINT } from '../constants';

export function* fetchGroup({ payload }) {
    const { botId } = payload;
    const resp = yield call(blockApis.getAllGroup, { botId });
    const { status, data, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.fetchGroupAndBlock(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* updateNameGroup({ payload }) {
    const { botId, name, groupId } = payload;
    const resp = yield call(blockApis.updateName, { botId, name, groupId });
    const { status, data, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.updateGroupName(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* addGroup({ payload }) {
    const { botId, name } = payload;
    const resp = yield call(blockApis.addNewGroup, { botId, name });
    const { status, message, data } = resp.data;
    if (status === STATUS_RESPONSE.CREATED) {
        toastSuccess('Tạo: ' + data.name + ' thành công');
        yield put(blockAction.addGroup(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        toastSuccess('Tạo hành động thành công!');
        let { newBlock } = data;
        yield put(blockAction.addBlock({ groupId, block: newBlock }));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        toastSuccess('Tạo hành động con thành công');
        yield put(blockAction.addEmptyElemnet({ block, newElement, preId }));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        let fileName = fileNameInServer.split('/')[1];
        let filePath = `${API_ENDPOINT}/bots/image/` + fileName;

        yield put(blockAction.uploadImageSuccess({ filePath, id, title }));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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
        let fileName = fileNameInServer.split('/')[1];
        let filePath = `${API_ENDPOINT}/bots/image/` + fileName;
        yield put(
            blockAction.uploadCardSuccess({ filePath, id, title, subtitle }),
        );
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
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

    const { status, message, data } = resp.data;

    if (status === STATUS_RESPONSE.OK) {
        toastSuccess('Xoá hành động con thành công');
        yield put(blockAction.deleteElement({ elementId, block: data }));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* updateElements({ payload }) {
    const { botId, groupId, blockId, elements, name } = payload;
    const resp = yield call(blockApis.updateElements, {
        botId,
        groupId,
        blockId,
        elements,
        name,
    });
    const { status, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        toastSuccess('Cập nhật chuỗi hành động thành công');
        yield put(blockAction.updateContentSuccess());
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}

export function* searchBlock({ payload }) {
    yield delay(750);
    const { botId, keySearch } = payload;
    const resp = yield call(blockApis.getAllGroup, { botId, keySearch });
    const { status, data, message } = resp.data;
    if (status === STATUS_RESPONSE.OK) {
        yield put(blockAction.fetchGroupAndBlock(data));
    } else {
        toastMsgError('Lỗi:  ' + status + ' - ' + message);
        if (status === STATUS_RESPONSE.UNAUTHORIZED) {
            window.localStorage.clear();
            history.push('/sign-in');
        }
    }
}
