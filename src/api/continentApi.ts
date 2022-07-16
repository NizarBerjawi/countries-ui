import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { LumenQuery, LumenCollectionResponse } from 'src/types/api';
import { Continent } from 'src/types/app';

const getPaginatedContinents = async (
  params?: LumenQuery,
): Promise<AxiosResponse<LumenCollectionResponse<Continent>>> => {
  const query = stringify(params, { addQueryPrefix: true });
  return http.get(`/continents${query}`);
};

export { getPaginatedContinents };
