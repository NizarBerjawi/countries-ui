export type BaseResource = {
  [key in string]: string | number | boolean;
};

export type Resource<T = BaseResource> = T;

export type Collection<T = BaseResource> = Resource<T>[];

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type PaginationMetaData = {
  currentPage?: number;
  from?: number;
  path: string;
  perPage: number;
  to?: number;
};

export type CollectionResponse<T = Collection> = {
  data: T[];
  links: PaginationLinks;
  meta: PaginationMetaData;
};

export type ResourceResponse<T = Resource> = {
  data: T;
};

export type Query = {
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
