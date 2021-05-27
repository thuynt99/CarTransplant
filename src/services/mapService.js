import {api} from './api';

const getPlaceByLocationUrl = '/geometry/current-address';
const searchAddressUrl = '/geometry/search-address';
const getRoutingUrl = '/geometry/get-route/';

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

export const getRoutingApi = params => {
  return api.get(getRoutingUrl, {
    fromLat: params.fromLat,
    fromLong: params.fromLong,
    toLat: params.toLat,
    toLong: params.toLong,
  });
};
