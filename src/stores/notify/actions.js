import {HTTP} from '../../constants/api';
import {getListNotiApi, registerTokenApi} from '../../services/notifyService';
import {
  GET_LIST_NOTI,
  GET_LIST_NOTI_FAILED,
  GET_LIST_NOTI_SUCCESS,
  REGISTER_TOKEN,
  REGISTER_TOKEN_FAILED,
  REGISTER_TOKEN_SUCCESS,
} from './action-types';

export function registerTokenPush(params) {
  return dispatch => {
    dispatch({
      type: REGISTER_TOKEN,
    });
    const dataJson = registerTokenApi(params);
    return dataJson.then(dataJson => processTakeTrip(dataJson, dispatch));
  };
}

const processTakeTrip = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: REGISTER_TOKEN_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: REGISTER_TOKEN_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function getListNoti() {
  return dispatch => {
    dispatch({
      type: GET_LIST_NOTI,
    });
    const dataJson = getListNotiApi();
    return dataJson.then(dataJson =>
      processGetListTripUser(dataJson, dispatch),
    );
  };
}

const processGetListTripUser = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: GET_LIST_NOTI_SUCCESS,
      data: dataJson.data,
    });
    console.log('dataJson', dataJson);
    return dataJson;
  } else {
    dispatch({
      type: GET_LIST_NOTI_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};
