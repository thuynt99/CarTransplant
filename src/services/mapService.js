import {api} from './api';

const getPlaceByLocationUrl = '/geometry/current-address';
const searchAddressUrl = '/geometry/search-address';

export const getPlaceByLocationApi = params => {
  return api.get(getPlaceByLocationUrl, {
    lat: params.lat,
    long: params.long,
  });
};

export const searchAddressApi = query => {
  return api.get(searchAddressUrl, {
    query,
  });
};
