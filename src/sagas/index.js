import { takeEvery, takeLatest } from '@redux-saga/core/effects';
import * as accountActionTypes from '../constants/account';
import * as botActionTypes from '../constants/bot';
import * as blockActionTypes from '../constants/block';
import * as accountSaga from './account';
import * as botSaga from './bot';
import * as blockSaga from './block';

function* rootSaga() {
    yield takeLatest(botActionTypes.FETCH_BOT, botSaga.fetchBot);
    yield takeEvery(botActionTypes.DELETE_BOT, botSaga.deleteBot);
    yield takeEvery(botActionTypes.ADD_BOT, botSaga.addNewBot);
    yield takeEvery(botActionTypes.UPDATE_BOT, botSaga.updateBot);
    yield takeEvery(
        accountActionTypes.SIGN_UP_ACCOUNT,
        accountSaga.signUpAccount,
    );
    yield takeEvery(
        accountActionTypes.SIGN_IN_ACCOUNT,
        accountSaga.signInAccount,
    );

    yield takeLatest(
        blockActionTypes.API_FETCH_GROUP_BLOCK,
        blockSaga.fetchGroup,
    );
    yield takeEvery(
        blockActionTypes.API_UPDATE_NAME_GROUP,
        blockSaga.updateNameGroup,
    );
    yield takeEvery(blockActionTypes.API_DELETE_GROUP, blockSaga.deleteGroup);
    yield takeEvery(blockActionTypes.API_ADD_GROUP, blockSaga.addGroup);
    yield takeEvery(blockActionTypes.API_ADD_BLOCK, blockSaga.addBlock);
    yield takeLatest(
        blockActionTypes.API_FETCH_ELEMENT,
        blockSaga.fetchElement,
    );

    yield takeLatest(blockActionTypes.API_DELETE_BLOCK, blockSaga.deleteBlock);

    yield takeEvery(blockActionTypes.API_ADD_ELEMENT, blockSaga.addElemnet);

    yield takeEvery(
        blockActionTypes.API_UPLOAD_IMAGE,
        blockSaga.uploadImageToServer,
    );
    yield takeEvery(
        blockActionTypes.API_UPLOAD_CARD,
        blockSaga.uploadImageCover,
    );
}

export default rootSaga;
