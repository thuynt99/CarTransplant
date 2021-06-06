import {api} from './api';

const registerTokenUrl = '/noti/register-token';
const getListNotiUrl = '/noti/list-notifications';

export const registerTokenApi = params => {
  return api.post(registerTokenUrl, {token: params});
};
export const getListNotiApi = () => {
  return api.get(getListNotiUrl);
};
