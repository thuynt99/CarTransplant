import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore} from 'redux';

import reducer from '../redux-saga/reducers/root';
import rootSaga from '../redux-saga/sagas/root';

const sagaMiddleware = createSagaMiddleware();
const middleware = applyMiddleware(sagaMiddleware);

const store = createStore(reducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
