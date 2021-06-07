import {HTTP} from '../../constants/api';
import {
  findTripApi,
  getListPendingApi,
  getListTripDriverApi,
  markDoneTripApi,
} from '../../services/tripService';
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

export function getListTripDriver(params) {
  return dispatch => {
    dispatch({
      type: GET_LIST_TRIP_DRIVER,
    });
    const dataJson = getListTripDriverApi(params);
    return dataJson.then(dataJson =>
      processGetListTripDriver(dataJson, dispatch),
    );
  };
}

const processGetListTripDriver = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: GET_LIST_TRIP_DRIVER_SUCCESS,
      data: dataJson.data,
    });
    console.log('dataJson', dataJson);
    return dataJson;
  } else {
    dispatch({
      type: GET_LIST_TRIP_DRIVER_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function maskDoneTrip(params) {
  return dispatch => {
    dispatch({
      type: MARK_DONE_TRIP,
    });
    const dataJson = markDoneTripApi(params);
    return dataJson.then(dataJson =>
      processMarkDoneTripApi(dataJson, dispatch),
    );
  };
}

const processMarkDoneTripApi = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: MARK_DONE_TRIP_SUCCESS,
      data: dataJson.data,
    });
    console.log('dataJson', dataJson);
    return dataJson;
  } else {
    dispatch({
      type: MARK_DONE_TRIP_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function getListTripPending(params) {
  return dispatch => {
    dispatch({
      type: GET_LIST_TRIP_PENDING,
    });
    const dataJson = getListPendingApi(params);
    return dataJson.then(dataJson =>
      processGetListTripPending(dataJson, dispatch),
    );
  };
}

const processGetListTripPending = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: GET_LIST_TRIP_PENDING_SUCCESS,
      data: dataJson.data,
    });
    console.log('dataJson', dataJson);
    return dataJson;
  } else {
    dispatch({
      type: GET_LIST_TRIP_PENDING_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};
