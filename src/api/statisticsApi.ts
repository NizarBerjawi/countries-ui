import http from '@utils/http';
import { stringify } from 'qs';
import { LumenQuery, LumenResourceResponse } from 'src/types/api';
import { StatisticsResource } from 'src/types/app';

const getHomepageStatistics = async (
  params?: LumenQuery,
): Promise<LumenResourceResponse<StatisticsResource[]>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/statistics${query}`);

  return data;
};

export { getHomepageStatistics };
