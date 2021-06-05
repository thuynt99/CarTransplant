import {api} from './api';

const findTripUrl = '/car/find-trip';
const listDriverTripUrl = '/car/driver/list-trip';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
export const getListTripDriverApi = params => {
  return api.get(listDriverTripUrl, {state: params});
};
