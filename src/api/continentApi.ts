import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { Continent, LumenCollectionResponse, LumenQuery } from 'src/types';
import { stringify } from 'qs';

const getPaginatedContinents = async (
  params: LumenQuery,
): Promise<AxiosResponse<LumenCollectionResponse<Continent>>> => {
  const query = stringify(params, { addQueryPrefix: true });
  return http.get(`/continents${query}`);
};

export { getPaginatedContinents };
