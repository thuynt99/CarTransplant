import _ from 'lodash';
import APISauce, {NETWORK_ERROR, TIMEOUT_ERROR} from 'apisauce';
import {HTTP} from '../constants/api';
import {Toast} from 'native-base';
import firebase from 'firebase';

const HOST = 'http://pi-cam.ddns.net:10000';
const TIME_OUT_API = 20000;

let HEADERS_MULTIPLE_PART = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data',
};
let HEADERS = {};
const getHeader = async () => {
  await firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      HEADERS = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: idToken,
      };
    })
    .catch(function(error) {
      console.log('error', error);
    });
};
export const apiGlobal = APISauce.create({
  baseURL: HOST,
  timeout: TIME_OUT_API,
});
const api = {
  post: async (endpoint, params) => {
    console.log('------POST-----', endpoint);
    console.log('------params-----', params);
    await getHeader();
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal.post(endpoint, params).then(response => {
      if (response.status) {
        return response.data;
      }
      let errorCode = '';
      switch (response.problem) {
        case TIMEOUT_ERROR:
        case NETWORK_ERROR:
          errorCode = HTTP.ERROR_INTERNET;
          Toast.show({
            text: 'Please try again',
            type: 'danger',
          });
          break;
        default:
          errorCode = '';
      }
    });
  },

  get: async (endpoint, params) => {
    console.log('------GET-----', endpoint);
    console.log('------params-----', params);
    await getHeader();
    console.log(HEADERS);
    apiGlobal.setHeaders(HEADERS);
    console.log('-------header-----', apiGlobal);
    return apiGlobal.get(endpoint, params).then(response => {
      if (response.status) {
        return response.data;
      }
      let errorCode = '';
      switch (response.problem) {
        case TIMEOUT_ERROR:
        case NETWORK_ERROR:
          errorCode = HTTP.ERROR_INTERNET;
          Toast.show({
            text: error,
            type: 'danger',
          });
          break;
        default:
          errorCode = '';
      }
    });
  },
};
export {api};
