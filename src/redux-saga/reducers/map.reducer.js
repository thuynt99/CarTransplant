import {
  GET_PLACE_BY_LOCATION,
  GET_PLACE_BY_LOCATION_FAILED,
  GET_PLACE_BY_LOCATION_SUCCESS,
} from '../type-actions.js/map.type-action';
const initialState = {startStation: '', endStation: ''};
export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PLACE_BY_LOCATION_SUCCESS:
      console.log('action', action.data.display_name);
      return {
        ...state,
        startStation: action.data.display_name,
      };
    default:
      return state;
  }
};
