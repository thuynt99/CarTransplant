import {combineReducers} from 'redux';
import mapReducer from './map/reducer';
import notiReducer from './notify/reducer';
import tripReducer from './trip/reducer';

const reducer = combineReducers({
  map: mapReducer,
  trip: tripReducer,
  notify: notiReducer,
});
export default reducer;
