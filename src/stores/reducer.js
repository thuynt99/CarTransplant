import {combineReducers} from 'redux';
import mapReducer from './map/reducer';
import tripReducer from './trip/reducer';
import carReducer from './cars/reducer';

const reducer = combineReducers({
  map: mapReducer,
  trip: tripReducer,
  car: carReducer,
});
export default reducer;
