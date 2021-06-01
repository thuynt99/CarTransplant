import {HTTP} from '../../constants/api';
import {findTripApi} from '../../services/tripService';
import {
  FIND_TRIP,
  FIND_TRIP_FAILED,
  FIND_TRIP_SUCCESS,
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
    const dataJson = findTripApi(params);
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
