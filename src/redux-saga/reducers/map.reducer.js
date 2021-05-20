import {
  GET_PLACE_BY_LOCATION,
  GET_PLACE_BY_LOCATION_FAILED,
  GET_PLACE_BY_LOCATION_SUCCESS,
} from '../type-actions.js/map.type-action';

export const mapReducer = (
  state = {startStation: '', endStation: ''},
  action,
) => {
  switch (action.type) {
    case GET_PLACE_BY_LOCATION_SUCCESS:
      return {
        ...state,
        startStation: action.data.display_name,
      };
    default:
      return state;
  }
};
