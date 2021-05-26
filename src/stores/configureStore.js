import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './reducer';

//  Returns the store instance
// It can  also take initialState argument when provided
const configureStore = () => {
  return {
    ...createStore(reducers, applyMiddleware(thunk)),
  };
};

const store = configureStore();
export default store;
