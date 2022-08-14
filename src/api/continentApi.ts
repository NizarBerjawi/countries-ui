import { stringify } from 'qs';
import { LumenCollectionResponse, LumenQuery } from 'src/types/api';
import { Continent } from 'src/types/app';
import http from '@utils/http';

const getPaginatedContinents = async (
  params?: LumenQuery,
): Promise<LumenCollectionResponse<Continent>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/continents${query}`);

  return data;
};

export { getPaginatedContinents };
