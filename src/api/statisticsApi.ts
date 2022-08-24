import { stringify } from 'qs';
import { CollectionResponse, Query, ResourceResponse } from 'src/types/api';
import { StatisticsResource } from 'src/types/app';
import http from '@utils/http';

const getHomepageStatistics = async (
  params?: Query,
): Promise<CollectionResponse<StatisticsResource>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/statistics${query}`);

  return data;
};

export { getHomepageStatistics };
