import {all} from 'redux-saga/effects';
import {watchGetInfoMap} from './map.saga';

export default function* rootSaga() {
  yield all([watchGetInfoMap()]);
}
