import http from '@utils/http';
import { AxiosResponse } from 'axios';
import { stringify } from 'qs';
import { LumenQuery, LumenResourceResponse } from 'src/types/api';
import { StatisticsResource } from 'src/types/app';

const getHomepageStatistics = async (
  params?: LumenQuery,
): Promise<AxiosResponse<LumenResourceResponse<StatisticsResource[]>>> => {
  const query = stringify(params, { addQueryPrefix: true });
  return http.get(`/statistics${query}`);
};

export { getHomepageStatistics };
