import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { Country, LumenCollectionResponse, LumenQuery } from 'src/types';
import qs from 'qs';

const getPaginatedCountries = async (
  params: LumenQuery,
): Promise<AxiosResponse<LumenCollectionResponse<Country>>> => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  return http.get(`/countries${query}`);
};

export { getPaginatedCountries };
