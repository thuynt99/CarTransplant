import {api} from './api';

const findTripUrl = '/car/find-trip';

export const findTripApi = params => {
  console.log('xxxxx', params);
  return api.post(findTripUrl, {
    begin_leave_time: params.dateStart,
    end_leave_time: params.dateEnd,
    from: params.from,
    to: params.to,
    opt: params.opt,
  });
};
