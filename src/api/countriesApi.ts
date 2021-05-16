import axios, { AxiosResponse } from 'axios';
import { stringify } from 'qs';

const getCountries = async (options: {
  [key: string]: string | number;
}): Promise<AxiosResponse<unknown>> => {
  const filters = stringify(options, { addQueryPrefix: true });

  return axios.get(`${process.env.API_URL}/countries${filters}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });
};

export { getCountries };
