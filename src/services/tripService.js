import {api} from './api';

const findTripUrl = '/car/find-trip';

export const findTripApi = params => {
  console.log('xxxxx', params);
  return api.post(findTripUrl, params);
};
