import { useEffect, useState } from 'react';
import {
  useQuery,
  QueryKey,
  UseQueryOptions,
  hashQueryKey,
} from '@tanstack/react-query';
import { LumenCollectionResponse, LumenQuery } from 'src/types/api';
import { parse } from 'qs';

const usePagination = (
  queryKey: (cursor?: string) => QueryKey,
  queryFn: (cursor?: string) => Promise<LumenCollectionResponse<unknown>>,
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: () => undefined;
  },
) => {
  const [cursor, setCursor] = useState<string | undefined>();

  const query = useQuery(
    queryKey(cursor),
    (): Promise<LumenCollectionResponse<unknown>> => queryFn(cursor),
    options,
  );

  const next = () => {
    if (!query.isPreviousData && hasMore()) {
      setCursor(nextCursor());
    }
  };

  const prev = () => {
    if (!query.isPreviousData && hasPrev()) {
      setCursor(prevCursor());
    }
  };

  const hasMore = (): boolean => {
    return !!query.data?.links.next;
  };

  const hasPrev = (): boolean => {
    return !!query.data?.links.prev;
  };

  const nextCursor = (): string | undefined => {
    if (!query.data) {
      return;
    }

    return getCursor(query.data.links.next);
  };

  const prevCursor = (): string | undefined => {
    if (!query.data) {
      return;
    }

    return getCursor(query.data.links.prev);
  };

  const getCursor = (link: string): string | undefined => {
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

  return {
    query,
    cursor,
    next,
    prev,
    hasMore,
    hasPrev,
    nextCursor,
    prevCursor,
  };
};

export default usePagination;
