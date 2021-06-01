import {
  REGISTER_CAR,
  REGISTER_CAR_SUCCESS,
  REGISTER_CAR_FAILED,
  GET_LIST_MY_CAR,
  GET_LIST_MY_CARS_FAILED,
  GET_LIST_MY_CARS_SUCCESS,
} from './action-types';

const initialState = {
  loading: false,
  listMyCar: [],
};

export default function carReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_CAR:
    case GET_LIST_MY_CAR:
      return {
        ...state,
        loading: true,
      };
    case REGISTER_CAR_SUCCESS:
    case REGISTER_CAR_FAILED:
    case GET_LIST_MY_CARS_FAILED:
      return {
        ...state,
        loading: false,
      };
    case GET_LIST_MY_CARS_SUCCESS:
      return {
        ...state,
        loading: false,
        listMyCar: action.data,
      };
    default:
      return state;
  }
}
