import {} from '../trip/action-types';
import {
  GET_LIST_NOTI,
  GET_LIST_NOTI_FAILED,
  GET_LIST_NOTI_SUCCESS,
  REGISTER_TOKEN,
  REGISTER_TOKEN_FAILED,
  REGISTER_TOKEN_SUCCESS,
} from './action-types';

const initialState = {
  loading: false,
  listNoti: [],
};

export default function notiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case REGISTER_TOKEN:
    case GET_LIST_NOTI:
      return {
        ...state,
        loading: true,
      };
    case GET_LIST_NOTI_SUCCESS:
      return {
        ...state,
        loading: false,
        listNoti: action.data,
      };
    case GET_LIST_NOTI_FAILED:
    case REGISTER_TOKEN_SUCCESS:
    case REGISTER_TOKEN_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
