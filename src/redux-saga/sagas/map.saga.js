import axios from 'axios';
import {Toast} from 'native-base';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  GET_PLACE_BY_LOCATION,
  GET_PLACE_BY_LOCATION_FAILED,
  GET_PLACE_BY_LOCATION_SUCCESS,
} from '../type-actions.js/map.type-action';
const getPlaceByLocationUrl = 'https://nominatim.openstreetmap.org/reverse/';

async function getPlaceByLocation(params) {
  console.log('----------params-------------', params);
  // return new Promise((resolve, reject) => {
  //   return axios
  //     .get(getPlaceByLocationUrl, {
  //       params: {
  //         lat: params?.latitude,
  //         lon: params?.longitude,
  //         format: 'json',
  //       },
  //     })
  //     .then(response => {
  //       console.log('-------GET--------', response);
  //       response.status === 200 ? resolve(response) : reject(response);
  //       return response;
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       reject(error);
  //     });
  // });
  const response = await axios.get(getPlaceByLocationUrl, {
    params: {lat: params?.latitude, lon: params?.longitude, format: 'json'},
  });
  console.log('response---------------', response);
  return response;
}
function* processPlaceByLocation(request) {
  try {
    const data = yield call(getPlaceByLocation, request.params);
    console.log('request', request);
    console.log('data', data);
    yield put({
      type: GET_PLACE_BY_LOCATION_SUCCESS,
      data: data.data,
    });
  } catch (error) {
    yield put({
      type: GET_PLACE_BY_LOCATION_FAILED,
      data: data.data,
    });
    console.log(error);
    Toast.show({
      text: error,
      type: 'danger',
    });
  }
}

export function* watchGetInfoMap() {
  yield takeLatest(GET_PLACE_BY_LOCATION, processPlaceByLocation);
}