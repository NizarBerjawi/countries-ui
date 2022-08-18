import { stringify } from 'qs';
import { CollectionResponse, Query } from 'src/types/api';
import { Continent } from 'src/types/app';
import http from '@utils/http';

const getPaginatedContinents = async (
  params?: Query,
): Promise<CollectionResponse<Continent>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/continents${query}`);

  return data;
};

export { getPaginatedContinents };
