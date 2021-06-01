import {combineReducers} from 'redux';
import mapReducer from './map/reducer';
import tripReducer from './trip/reducer';

const reducer = combineReducers({
  map: mapReducer,
  trip: tripReducer,
});
export default reducer;
