import {combineReducers} from 'redux';
import mapReducer from './map/reducer';

const reducer = combineReducers({
  map: mapReducer,
});
export default reducer;
