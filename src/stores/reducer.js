import {combineReducers} from 'redux';
import mapReducer from './map/reducer';
import notiReducer from './notify/reducer';
import tripReducer from './trip/reducer';
import carReducer from './cars/reducer';

const reducer = combineReducers({
  map: mapReducer,
  trip: tripReducer,
<<<<<<< HEAD
  car: carReducer,
=======
  notify: notiReducer,
>>>>>>> 2d4993ba493e2b7345f62b149a770f8b9b8f14cf
});
export default reducer;
