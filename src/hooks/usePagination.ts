import { useState } from 'react';
import { useQuery, QueryKey, UseQueryOptions } from '@tanstack/react-query';
import { LumenCollectionResponse, LumenQuery } from 'src/types/api';
import { parse } from 'qs';

const usePagination = <T = unknown>(
  queryKey: QueryKey,
  queryFn: (cursor?: string) => Promise<LumenCollectionResponse<T>>,
  options: UseQueryOptions<LumenCollectionResponse<T>> = {},
) => {
  const [cursor, setCursor] = useState<string | undefined>();

  const key: QueryKey = [...queryKey, cursor];

  const query = useQuery(key, () => queryFn(cursor), {
    keepPreviousData: true,
    ...options,
  });

  const hasMore = !!query.data?.links.next;

  const hasPrev = !!query.data?.links.prev;

  const next = () => {
    if (!query.isPreviousData && hasMore) {
      setCursor(nextCursor());
    }
  };

  const prev = () => {
    if (!query.isPreviousData && hasPrev) {
      setCursor(prevCursor());
    }
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

  const remove = () => {
    setCursor(undefined);
    query.remove();
  };

  return {
    ...query,
    data: query.data?.data,
    remove,
    next,
    prev,
    hasMore,
    hasPrev,
    cursor,
    nextCursor,
    prevCursor,
  };
};

export default usePagination;
