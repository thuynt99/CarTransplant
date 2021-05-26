import {
  GET_PLACE_BY_LOCATION,
  GET_PLACE_BY_LOCATION_FAILED,
  GET_PLACE_BY_LOCATION_SUCCESS,
} from './action-types';

const initialState = {
  loading: false,
  startLocation: {},
};

export default function mapReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_PLACE_BY_LOCATION:
      return {
        ...state,
        loading: true,
      };
    case GET_PLACE_BY_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_PLACE_BY_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        startLocation: action.data,
      };
    default:
      return state;
  }
}
