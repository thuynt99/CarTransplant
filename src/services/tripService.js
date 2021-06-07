import {api} from './api';

const findTripUrl = '/car/find-trip';
const listDriverTripUrl = '/car/driver/list-trip';
const markDoneTripUrl = '/car/driver/mark-user-trip-done';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
export const getListTripDriverApi = params => {
  return api.get(listDriverTripUrl, {state: params});
};
export const markDoneTripApi = params => {
  return api.get(markDoneTripUrl, {id: params});
};
