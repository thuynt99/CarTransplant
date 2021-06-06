import {combineReducers} from 'redux';
import mapReducer from './map/reducer';
import notiReducer from './notify/reducer';
import tripReducer from './trip/reducer';
import carReducer from './cars/reducer';

const reducer = combineReducers({
  map: mapReducer,
  trip: tripReducer,
  car: carReducer,
  notify: notiReducer,
});
export default reducer;
