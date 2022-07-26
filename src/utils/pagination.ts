import { AxiosResponse } from 'axios';
import { UseQueryResult } from '@tanstack/react-query';
import { LumenCollectionResponse, LumenQuery } from 'src/types/api';
import { parse } from 'qs';

const hasPrevious = (
  query: UseQueryResult<LumenCollectionResponse<unknown>>,
): boolean => {
  return !!query.data?.links.prev;
};

const hasNext = (
  query: UseQueryResult<LumenCollectionResponse<unknown>>,
): boolean => {
  return !!query.data?.links.next;
};

const getNextCursor = (
  query: UseQueryResult<LumenCollectionResponse<unknown>>,
): string | undefined => {
  if (!query.data) {
    return;
  }

  return cursor(query.data.links.next);
};

const getPreviousCursor = (
  query: UseQueryResult<LumenCollectionResponse<unknown>>,
): string | undefined => {
  if (!query.data) {
    return;
  }

  return cursor(query.data.links.prev);
};

const cursor = (link: string): string | undefined => {
  if (!link) {
    return;
  }
  const search: LumenQuery = parse(new URL(link).search, {
    ignoreQueryPrefix: true,
  });

  if (!search.page) {
    return;
  }

  return search.page?.cursor;
};

export { cursor, hasPrevious, hasNext, getNextCursor, getPreviousCursor };
