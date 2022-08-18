import { stringify } from 'qs';
import { Query, ResourceResponse } from 'src/types/api';
import { StatisticsResource } from 'src/types/app';
import http from '@utils/http';

const getHomepageStatistics = async (
  params?: Query,
): Promise<ResourceResponse<StatisticsResource[]>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/statistics${query}`);

  return data;
};

export { getHomepageStatistics };
