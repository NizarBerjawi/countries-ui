import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const getCountries = async (options: {
  [key: string]: string | number;
}): Promise<AxiosResponse<unknown>> => {
  const filters = qs.stringify(options, { addQueryPrefix: true });

  return axios.get(`${process.env.API_URL}/countries${filters}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export { getCountries };
