export type LumenValue =
  | null
  | string
  | number
  | boolean
  | LumenResource
  | LumenCollection;

export type LumenResource = {
  [key: string]: any;
};

export type LumenCollection = LumenResource[];

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
