import {api} from './api';

const getPlaceByLocationUrl = '/geometry/current-address';

export const getPlaceByLocationApi = params => {
  return api.get(getPlaceByLocationUrl, {
    lat: params.lat,
    long: params.long,
  });
};
