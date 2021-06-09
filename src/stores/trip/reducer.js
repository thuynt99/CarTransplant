import {database} from 'firebase';
import {
  FIND_TRIP,
  FIND_TRIP_FAILED,
  FIND_TRIP_SUCCESS,
  GET_LIST_ACTIVE_ZONE,
  GET_LIST_ACTIVE_ZONE_FAILED,
  GET_LIST_ACTIVE_ZONE_SUCCESS,
  GET_LIST_TRIP_DRIVER,
  GET_LIST_TRIP_DRIVER_FAILED,
  GET_LIST_TRIP_DRIVER_SUCCESS,
  GET_LIST_TRIP_PENDING,
  GET_LIST_TRIP_PENDING_FAILED,
  GET_LIST_TRIP_PENDING_SUCCESS,
  MARK_DONE_TRIP,
  MARK_DONE_TRIP_FAILED,
  MARK_DONE_TRIP_SUCCESS,
  POST_LIST_ACTIVE_ZONE,
  POST_LIST_ACTIVE_ZONE_FAILED,
  POST_LIST_ACTIVE_ZONE_SUCCESS,
  TAKE_TRIP_USER,
  TAKE_TRIP_USER_FAILED,
  TAKE_TRIP_USER_SUCCESS,
} from '../trip/action-types';

const initialState = {
  loading: false,
  listTrip: [],
  listTripPending: [],
  listActiveZone: [],
};

export default function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FIND_TRIP:
    case GET_LIST_TRIP_DRIVER:
    case MARK_DONE_TRIP:
    case GET_LIST_TRIP_PENDING:
    case TAKE_TRIP_USER:
    case GET_LIST_ACTIVE_ZONE:
    case POST_LIST_ACTIVE_ZONE:
      return {
        ...state,
        loading: true,
      };
    case FIND_TRIP_SUCCESS:
    case FIND_TRIP_FAILED:
    case GET_LIST_TRIP_DRIVER_FAILED:
    case MARK_DONE_TRIP_SUCCESS:
    case MARK_DONE_TRIP_FAILED:
    case GET_LIST_TRIP_PENDING_FAILED:
    case TAKE_TRIP_USER_SUCCESS:
    case TAKE_TRIP_USER_FAILED:
    case GET_LIST_ACTIVE_ZONE_FAILED:
    case POST_LIST_ACTIVE_ZONE_SUCCESS:
    case POST_LIST_ACTIVE_ZONE_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_LIST_TRIP_DRIVER_SUCCESS:
      return {
        ...state,
        loading: false,
        listTrip: action.data,
      };
    case GET_LIST_TRIP_PENDING_SUCCESS:
      return {
        ...state,
        loading: false,
        listTripPending: action.data.userTrip,
      };
    case GET_LIST_ACTIVE_ZONE_SUCCESS:
      return {
        ...state,
        loading: false,
        listActiveZone: action.data,
      };
    default:
      return state;
  }
}
