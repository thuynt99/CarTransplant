import {api} from './api';

const registerCarUrl = '/car/register-car';
const getListMyCarUrl = '/car/list-my-car';

export const registerCarApi = params => {
  return api.post(registerCarUrl, params);
};
export const getListMyCarApi = params => {
  return api.post(getListMyCarUrl, params);
};
