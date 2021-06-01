import {
  FIND_TRIP,
  FIND_TRIP_FAILED,
  FIND_TRIP_SUCCESS,
  TAKE_TRIP,
  TAKE_TRIP_FAILED,
  TAKE_TRIP_SUCCESS,
} from '../trip/action-types';

const initialState = {
  loading: false,
};

export default function tripReducer(state = initialState, action = {}) {
  switch (action.type) {
    case FIND_TRIP:
    case TAKE_TRIP:
      return {
        ...state,
        loading: true,
      };
    case FIND_TRIP_SUCCESS:
    case FIND_TRIP_FAILED:
    case TAKE_TRIP_SUCCESS:
    case TAKE_TRIP_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
