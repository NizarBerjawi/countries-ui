/* eslint-disable no-console */
import axios from 'axios';
import { fetch } from './transformer';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.transformResponse = [(data) => fetch(JSON.parse(data))];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
