import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { Country, LumenCollectionResponse } from 'src/types';

const getCountries = async (params: {
  [key: string]: string | number;
}): Promise<AxiosResponse<LumenCollectionResponse<Country>>> =>
  http.get(`/countries`, { params });

export { getCountries };
