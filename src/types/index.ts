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
  perPage: string;
  to: number;
};

export type LumenCollectionResponse<T> = {
  data: T[];
  links: LumenPaginationLinks;
  meta: LumenMetaData;
};

export type LumentResourceApi<T> = {
  data: T;
};

export interface Country {
  name: string;
  iso3166Alpha2: string;
  iso3166Alpha3: string;
  iso3166Numeric: number;
  population: number;
  area: number;
  phoneCode: string;
  continent: LumenResource;
  timeZones: LumenCollection;
  flag: LumenResource;
  neighbours: LumenCollection;
}
