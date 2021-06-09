import {api} from './api';

const findTripUrl = '/car/find-trip';
const listDriverTripUrl = '/car/driver/list-trip';
const markDoneTripUrl = '/car/driver/mark-user-trip-done';
const getListPendingUrl = '/car/driver/find-pending-trip';
const takeTripUserUrl = '/car/driver/takeTrip';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
export const getListTripDriverApi = params => {
  return api.get(listDriverTripUrl, {state: params});
};
export const markDoneTripApi = params => {
  return api.get(markDoneTripUrl, {id: params});
};
export const getListPendingApi = params => {
  return api.get(getListPendingUrl, params);
};
export const takeTripUserApi = params => {
  return api.post(takeTripUserUrl, params);
};
