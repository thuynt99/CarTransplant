import {HTTP} from '../../constants/api';
import {
  cancelTripApi,
  findTripApi,
  getListTripUserUApi,
  takeTripApi,
} from '../../services/tripService';
import {
  CANCEL_TRIP,
  CANCEL_TRIP_FAILED,
  CANCEL_TRIP_SUCCESS,
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

export function findTrip(params) {
  return dispatch => {
    dispatch({
      type: FIND_TRIP,
    });
    const dataJson = findTripApi(params);
    return dataJson.then(dataJson => processFindTrip(dataJson, dispatch));
  };
}

const processFindTrip = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: FIND_TRIP_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: FIND_TRIP_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function takeTrip(params) {
  return dispatch => {
    dispatch({
      type: TAKE_TRIP,
    });
    const dataJson = takeTripApi(params);
    return dataJson.then(dataJson => processTakeTrip(dataJson, dispatch));
  };
}

const processTakeTrip = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: TAKE_TRIP_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: TAKE_TRIP_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function getListTripUser(params) {
  return dispatch => {
    dispatch({
      type: GET_LIST_TRIP_USER,
    });
    const dataJson = getListTripUserUApi(params);
    return dataJson.then(dataJson =>
      processGetListTripUser(dataJson, dispatch),
    );
  };
}

const processGetListTripUser = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: GET_LIST_TRIP_USER_SUCCESS,
      data: dataJson.data,
    });
    console.log('dataJson', dataJson);
    return dataJson;
  } else {
    dispatch({
      type: GET_LIST_TRIP_USER_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function cancelTrip(params) {
  return dispatch => {
    dispatch({
      type: CANCEL_TRIP,
    });
    const dataJson = cancelTripApi(params);
    return dataJson.then(dataJson => processCancelTrip(dataJson, dispatch));
  };
}

const processCancelTrip = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: CANCEL_TRIP_SUCCESS,
      data: dataJson.data,
    });
    console.log('dataJson', dataJson);
    return dataJson;
  } else {
    dispatch({
      type: CANCEL_TRIP_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};
