import { takeEvery, takeLatest } from '@redux-saga/core/effects';
import * as accountActionTypes from '../constants/account';
import * as botActionTypes from '../constants/bot';
import * as ruleActionTypes from '../constants/rule';
import * as blockActionTypes from '../constants/block';
import * as accountSaga from './account';
import * as botSaga from './bot';
import * as blockSaga from './block';
import * as ruleSaga from './rules';

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

    yield takeEvery(blockActionTypes.API_DELETE_BLOCK, blockSaga.deleteBlock);

    yield takeEvery(blockActionTypes.API_ADD_ELEMENT, blockSaga.addElemnet);

    yield takeEvery(
        blockActionTypes.API_UPLOAD_IMAGE,
        blockSaga.uploadImageToServer,
    );
    yield takeEvery(
        blockActionTypes.API_UPLOAD_CARD,
        blockSaga.uploadImageCover,
    );
    yield takeEvery(
        blockActionTypes.API_DELETE_ELEMENT,
        blockSaga.deleteElement,
    );
    yield takeEvery(
        blockActionTypes.API_UPDATE_ELEMENT,
        blockSaga.updateContentBlock,
    );

    yield takeLatest(blockActionTypes.SEARCH_BLOCK, blockSaga.searchBlock);

    // Rule

    yield takeLatest(ruleActionTypes.API_FETCH_RULE, ruleSaga.fetchRule);

    yield takeEvery(ruleActionTypes.API_ADD_RULE, ruleSaga.addRule);

    yield takeEvery(ruleActionTypes.API_UPDATE_RULE, ruleSaga.updateRule);

    yield takeEvery(ruleActionTypes.API_DELETE_RULE, ruleSaga.deleteRule);

    yield takeLatest(ruleActionTypes.SEARCH_RULE, ruleSaga.searchRule);
}

export default rootSaga;
