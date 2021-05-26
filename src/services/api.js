import _ from 'lodash';
import APISauce, {NETWORK_ERROR, TIMEOUT_ERROR} from 'apisauce';
import {HTTP} from '../constants/api';

const HOST = 'http://pi-cam.ddns.net:10000';
const TIME_OUT_API = 20000;
// const HEADERS = {
//   Accept: 'application/json',
//   Content-Type: 'application/json',
// };

// let HEADERS_MULTIPLE_PART = {
//   Accept: 'application/json',
//   'Content-Type': 'multipart/form-data',
// };

export const apiGlobal = APISauce.create({
  baseURL: HOST,
  timeout: TIME_OUT_API,
  headers: {},
});
const api = {
  post: (endpoint, params) => {
    console.log('------POST-----', endpoint);
    console.log('------params-----', params);
    // apiGlobal.setHeader(HEADERS);
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
            text: error,
            type: 'danger',
          });
          break;
        default:
          errorCode = '';
      }
    });
  },

  get: (endpoint, params) => {
    console.log('------GET-----', endpoint);
    console.log('------params-----', params);
    // apiGlobal.setHeader(HEADERS);
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
