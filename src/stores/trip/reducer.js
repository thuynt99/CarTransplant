import {
  FIND_TRIP,
  FIND_TRIP_FAILED,
  FIND_TRIP_SUCCESS,
  GET_LIST_TRIP_USER,
  GET_LIST_TRIP_USER_FAILED,
  GET_LIST_TRIP_USER_SUCCESS,
  TAKE_TRIP,
  TAKE_TRIP_FAILED,
  TAKE_TRIP_SUCCESS,
} from '../trip/action-types';

const initialState = {
  loading: false,
  listTrip: [],
};

export default function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FIND_TRIP:
    case TAKE_TRIP:
    case GET_LIST_TRIP_USER:
      return {
        ...state,
        loading: true,
      };
    case GET_LIST_TRIP_USER_SUCCESS:
      return {
        ...state,
        listTrip: action.data,
      };
    case FIND_TRIP_SUCCESS:
    case FIND_TRIP_FAILED:
    case TAKE_TRIP_SUCCESS:
    case TAKE_TRIP_FAILED:
    case GET_LIST_TRIP_USER_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
