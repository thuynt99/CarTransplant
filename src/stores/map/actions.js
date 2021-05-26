import {HTTP} from '../../constants/api';
import {
  getPlaceByLocationApi,
  searchAddressApi,
} from '../../services/mapService';
import {
  GET_PLACE_BY_LOCATION,
  GET_PLACE_BY_LOCATION_FAILED,
  GET_PLACE_BY_LOCATION_SUCCESS,
  SEARCH_ADDRESS,
  SEARCH_ADDRESS_FAILED,
  SEARCH_ADDRESS_SUCCESS,
} from './action-types';

export function getPlaceByLocation(params) {
  return dispatch => {
    dispatch({
      type: GET_PLACE_BY_LOCATION,
    });
    const dataJson = getPlaceByLocationApi(params);
    return dataJson.then(dataJson =>
      processGetPlaceByLocation(dataJson, dispatch),
    );
  };
}

const processGetPlaceByLocation = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: GET_PLACE_BY_LOCATION_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: GET_PLACE_BY_LOCATION_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};

export function searchAddress(query) {
  return dispatch => {
    dispatch({
      type: SEARCH_ADDRESS,
    });
    const dataJson = searchAddressApi(query);
    return dataJson.then(dataJson => processSearchAddress(dataJson, dispatch));
  };
}

const processSearchAddress = (dataJson, dispatch) => {
  if (dataJson.status) {
    dispatch({
      type: SEARCH_ADDRESS_SUCCESS,
      data: dataJson.data,
    });
    return dataJson;
  } else {
    dispatch({
      type: SEARCH_ADDRESS_FAILED,
      data: dataJson.data,
    });
    return dataJson;
  }
};
