export type LumenResource = {
  [key: string]: LumenResource | LumenCollection;
};

export type LumenCollection = LumenResource[];

export type LumenPaginationLinks = {
  first: string;
  last: string;
  prev: string;
  next: string;
};

export type LumenMetaData = {
  currentPage: number;
  from: number;
  path: string;
  perPage: number;
  to: number;
};

export type LumenCollectionResponse<T> = {
  data: T[];
  links: LumenPaginationLinks;
  meta: LumenMetaData;
};

export type LumenResourceResponse<T> = {
  data: T;
};

export type LumenQuery = {
  include?: string[];
  filter?: {
    [key: string]: string;
  };
  sort?: string[];
  page?: {
    number: number;
    size?: number;
  };
};
