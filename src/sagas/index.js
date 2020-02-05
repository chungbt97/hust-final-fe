import {
    call,
    delay,
    fork,
    put,
    take,
    takeEvery,
    takeLatest,
} from '@redux-saga/core/effects';

export function* helloSaga() {
    console.log('Hello Sagas!')
  }


function* rootSaga() {
    yield fork(helloSaga);
}

export default rootSaga;