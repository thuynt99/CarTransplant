import {
  GET_PLACE_BY_LOCATION,
  GET_PLACE_BY_LOCATION_FAILED,
  GET_PLACE_BY_LOCATION_SUCCESS,
} from '../type-actions.js/map.type-action';

export const getPlaceByLocation = params => ({
  type: GET_PLACE_BY_LOCATION,
  params,
  response: {
    success: GET_PLACE_BY_LOCATION_SUCCESS,
    failed: GET_PLACE_BY_LOCATION_FAILED,
  },
});
