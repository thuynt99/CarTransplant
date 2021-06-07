import {database} from 'firebase';
import {
  FIND_TRIP,
  FIND_TRIP_FAILED,
  FIND_TRIP_SUCCESS,
  GET_LIST_TRIP_DRIVER,
  GET_LIST_TRIP_DRIVER_FAILED,
  GET_LIST_TRIP_DRIVER_SUCCESS,
  GET_LIST_TRIP_PENDING,
  GET_LIST_TRIP_PENDING_FAILED,
  GET_LIST_TRIP_PENDING_SUCCESS,
  MARK_DONE_TRIP,
  MARK_DONE_TRIP_FAILED,
  MARK_DONE_TRIP_SUCCESS,
} from '../trip/action-types';

const initialState = {
  loading: false,
  listTrip: [],
  listPending: [],
};

export default function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FIND_TRIP:
    case GET_LIST_TRIP_DRIVER:
    case MARK_DONE_TRIP:
    case GET_LIST_TRIP_PENDING:
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
        listTrip: action.data,
      };
    default:
      return state;
  }
}
