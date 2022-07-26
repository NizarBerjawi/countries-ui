import http from '@utils/http';
import { stringify } from 'qs';
import { LumenQuery, LumenCollectionResponse } from 'src/types/api';
import { Continent } from 'src/types/app';

const getPaginatedContinents = async (
  params?: LumenQuery,
): Promise<LumenCollectionResponse<Continent>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/continents${query}`);

  return data;
};

export { getPaginatedContinents };
