export type LumenValue = undefined | string | number | boolean;
// | LumenResource
// | LumenCollection;

export type LumenResource<T = unknown> = T;

export type LumenCollection<T = unknown> = LumenResource<T>[];

export type LumenPaginationLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type LumenMetaData = {
  currentPage?: number;
  from?: number;
  path: string;
  perPage: number;
  to?: number;
};

export type LumenCollectionResponse<T = LumenCollection> = {
  data: T[];
  links: LumenPaginationLinks;
  meta: LumenMetaData;
};

export type LumenResourceResponse<T = LumenResource> = {
  data: T;
};

export type LumenQuery = {
  include?: string | string[];
  filter?: {
    [key: string]: string;
  };
  sort?: string[];
  page?: {
    cursor?: string;
    size?: number;
  };
};
