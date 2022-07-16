import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { LumenQuery, LumenCollectionResponse } from 'src/types/api';
import { Country } from 'src/types/app';

const getPaginatedCountries = async (
  params?: LumenQuery,
): Promise<AxiosResponse<LumenCollectionResponse<Country>>> => {
  const query = stringify(params, { addQueryPrefix: true });
  return http.get(`/countries${query}`);
};

export { getPaginatedCountries };
