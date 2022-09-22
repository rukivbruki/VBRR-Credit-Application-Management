import axios from 'axios';
import { TIMEOUT } from '../../const.ts';

export const api = () =>
  axios.create({
    timeout: TIMEOUT,
  });

let call;

export const canceledGet = (url) => {
  if (call) {
    call.cancel('Request was canceled');
  }
  call = axios.CancelToken.source();
  return api().get(url, { cancelToken: call.token });
};
