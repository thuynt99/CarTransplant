import {HTTP} from '../../constants/api';
import {
  deleteListCarAPi,
  getListMyCarApi,
  registerCarApi,
} from '../../services/carService';
import {
  REGISTER_CAR,
  REGISTER_CAR_SUCCESS,
  REGISTER_CAR_FAILED,
  GET_LIST_MY_CAR,
  GET_LIST_MY_CARS_SUCCESS,
  GET_LIST_MY_CARS_FAILED,
  DELETE_LIST_MY_CAR,
  DELETE_LIST_MY_CAR_SUCCESS,
  DELETE_LIST_MY_CAR_FAILED,
} from './action-types';

export function registerCar(params) {
  return dispatch => {
    dispatch({
      type: REGISTER_CAR,
    });
    const dataJson = registerCarApi(params);
    return dataJson.then(dataJson => processRegisterCar(dataJson, dispatch));
  };
}

const processRegisterCar = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: REGISTER_CAR_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: REGISTER_CAR_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function getListMyCar(params) {
  return dispatch => {
    dispatch({
      type: GET_LIST_MY_CAR,
    });
    const dataJson = getListMyCarApi(params);
    return dataJson.then(dataJson => processGetListMyCar(dataJson, dispatch));
  };
}

const processGetListMyCar = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: GET_LIST_MY_CARS_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: GET_LIST_MY_CARS_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};
export function deteleListCar(params) {
  return dispatch => {
    dispatch({
      type: DELETE_LIST_MY_CAR,
    });
    const dataJson = deleteListCarAPi(params);
    return dataJson.then(dataJson => processDeleteListCar(dataJson, dispatch));
  };
}

const processDeleteListCar = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: DELETE_LIST_MY_CAR_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: DELETE_LIST_MY_CAR_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};
