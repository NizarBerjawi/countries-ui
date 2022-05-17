import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { Continent, LumenCollectionResponse, LumenQuery } from 'src/types';
import qs from 'qs';

const getContinents = async (
  params: LumenQuery,
): Promise<AxiosResponse<LumenCollectionResponse<Continent>>> => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  return http.get(`/continents${query}`);
};

export { getContinents };
