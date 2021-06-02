import {api} from './api';

const registerCarUrl = '/car/register-car';
const getListMyCarUrl = '/car/list-my-car';
const deleteListCarUrl = '/car/delete-car';
const registerTripDriverUrl = '/car/register-trip';

export const registerCarApi = params => {
  return api.post(registerCarUrl, params);
};
export const getListMyCarApi = params => {
  return api.get(getListMyCarUrl, params);
};
export const deleteListCarAPi = params => {
  return api.post(deleteListCarUrl, params);
};
export const registerTripDriverApi = params => {
  return api.post(registerTripDriverUrl, params);
};
