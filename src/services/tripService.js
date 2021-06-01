import {api} from './api';

const findTripUrl = '/car/find-trip';

export const findTripApi = params => {
  return api.post(findTripUrl, params);
};
