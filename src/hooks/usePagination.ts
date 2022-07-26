import { useEffect, useState } from 'react';
import {
  useQuery,
  QueryKey,
  UseQueryOptions,
  hashQueryKey,
} from '@tanstack/react-query';
import { cursor } from '@utils/pagination';
import { LumenCollectionResponse } from 'src/types/api';

const usePagination = (
  queryKey: (cursor: string | undefined) => QueryKey,
  queryFn: (
    cursor: string | undefined,
  ) => Promise<LumenCollectionResponse<unknown>>,
  options?: Omit<UseQueryOptions, 'queryKey' | 'queryFn' | 'initialData'> & {
    initialData?: () => undefined;
  },
) => {
  const [cursors, setCursors] = useState<{ [key: string]: string | undefined }>(
    {},
  );
  const keyHash = hashQueryKey(queryKey);

  const query = useQuery(
    queryKey(cursors[keyHash]),
    () => {
      console.log('here');
      return queryFn(cursors[keyHash]);
    },
    options,
  );

  const next = () => {
    if (!query.isPreviousData && hasMore()) {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [`${keyHash}`]: nextCursor(),
      }));
    }
  };

  const prev = () => {
    if (!query.isPreviousData && hasPrev()) {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [`${keyHash}`]: prevCursor(),
      }));
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
    console.log(query.data);
    return cursor(query.data.links.next);
  };

  const prevCursor = (): string | undefined => {
    if (!query.data) {
      return;
    }

    return cursor(query.data.links.prev);
  };

  return {
    query,
    cursors,
    next,
    prev,
    hasMore,
    hasPrev,
    nextCursor,
    prevCursor,
  };
};

export default usePagination;
