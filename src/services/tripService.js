import {api} from './api';

const findTripUrl = '/car/find-trip';
const takeTripUrl = '/car/take-trip';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
export const takeTripApi = params => {
  return api.post(takeTripUrl, params);
};
