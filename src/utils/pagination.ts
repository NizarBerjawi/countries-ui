import { AxiosResponse } from 'axios';
import { UseQueryResult } from 'react-query';
import { LumenCollectionResponse, LumenQuery } from 'src/types/api';
import qs from 'qs';

const hasPrevious = (
  query: UseQueryResult<AxiosResponse<LumenCollectionResponse<any>>>,
): boolean => {
  return !!query.data?.data.links.prev;
};

const hasNext = (
  query: UseQueryResult<AxiosResponse<LumenCollectionResponse<any>>>,
): boolean => {
  return !!query.data?.data.links.next;
};

const getNextCursor = (
  query: UseQueryResult<AxiosResponse<LumenCollectionResponse<any>>>,
): string | undefined => {
  if (!query.data) {
    return;
  }

  return cursor(query.data.data.links.next);
};

const getPreviousCursor = (
  query: UseQueryResult<AxiosResponse<LumenCollectionResponse<any>>>,
): string | undefined => {
  if (!query.data) {
    return;
  }

  return cursor(query.data.data.links.prev);
};

const cursor = (link: string): string | undefined => {
  if (!link) {
    return;
  }
  const search: LumenQuery = qs.parse(new URL(link).search, {
    ignoreQueryPrefix: true,
  });

  if (!search.page) {
    return;
  }

  return search.page?.cursor;
};

export { cursor, hasPrevious, hasNext, getNextCursor, getPreviousCursor };
