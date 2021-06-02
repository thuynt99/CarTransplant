import {api} from './api';

const findTripUrl = '/car/find-trip';
const takeTripUrl = '/car/take-trip';
const getListTripUserUrl = '/car/user/list-trip';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
export const takeTripApi = params => {
  return api.post(takeTripUrl, params);
};
export const getListTripUserUApi = params => {
  return api.get(getListTripUserUrl, params);
};
