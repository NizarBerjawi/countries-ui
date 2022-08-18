/* eslint-disable no-console */
import axios from 'axios';
import { CollectionResponse, ResourceResponse } from 'src/types/api';

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.defaults.transformResponse = [
  (data: string) => {
    const response = JSON.parse(data) as CollectionResponse | ResourceResponse;

    return response;
  },
];

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
