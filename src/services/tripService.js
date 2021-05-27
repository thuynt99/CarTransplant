import {api} from './api';

const findTripUrl = '/car/find-trip';

export const findTripApi = params => {
  return api.get(findTripUrl, null, {
    begin_leave_time: params.dateStart,
    end_leave_time: params.dateEnd,
    from: from,
    to: to,
  });
};
