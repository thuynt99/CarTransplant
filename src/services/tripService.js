import {api} from './api';

const findTripUrl = '/car/find-trip';
const takeTripUrl = '/car/take-trip';
const getListTripUserUrl = '/car/user/list-trip';
const cancelTripUrl = '/car/user/cancel-trip';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
export const takeTripApi = params => {
  return api.post(takeTripUrl, params);
};
export const getListTripUserUApi = params => {
  return api.get(getListTripUserUrl, {state: params});
};
export const cancelTripApi = params => {
  return api.delete(cancelTripUrl, {id: params});
};
