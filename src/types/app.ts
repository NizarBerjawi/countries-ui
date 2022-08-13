import { LumenCollection, LumenResource } from './api';

export type Continent = LumenResource<{
  name: string;
  code: string;
  countries?: LumenCollection<Country>;
}>;

export type Country = LumenResource<{
  name: string;
  iso3166Alpha2: string;
  iso3166Alpha3: string;
  iso3166Numeric: number;
  population: number;
  area: number;
  phoneCode: string;
  location?: Location;
  currency?: Currency;
  continent?: Continent;
  flag?: Flag;
  timeZones?: LumenCollection<TimeZone>;
  neighbours?: LumenCollection<Country>;
  languages?: LumenCollection<Language>;
  alternateNames?: LumenCollection<AlternateName>;
}>;

export type Location = LumenResource<{
  latitude: number;
  longitude: number;
}>;

export type Currency = LumenResource<{
  code: string;
  name: string;
  countries?: LumenCollection<Country>;
}>;

export type Flag = LumenResource<{
  filename: string;
  url: string;
  country?: Country;
}>;

export type TimeZone = LumenResource<{
  code: string;
  timeZone: string;
  gmtOffset: string;
  country?: Country;
}>;

export type Language = LumenResource<{
  name: string;
  'iso639.1': string;
  'iso639.2': string;
  'iso639.3': string;
  countries: LumenCollection<Country>;
}>;

export type AlternateName = LumenResource<{
  name: string;
  isPrefferedName: string;
  isShortName: string;
  isHistoric: boolean;
  isColliquial: boolean;
  language?: Language;
  place?: Place;
}>;

export type Place = LumenResource<{
  geonameId: number;
  name: string;
  asciiName: string;
  population: number;
  elevation: number;
  dem: number;
  alternateNames?: LumenCollection<AlternateName>;
  timeZone?: TimeZone;
  featureCode?: FeatureCode;
  featureClass?: FeatureClass;
  country?: Country;
  location?: Location;
}>;

export type FeatureCode = LumenResource<{
  code: string;
  shortDescription: string;
  fullDescription: string;
  featureClass?: FeatureClass;
}>;

export type FeatureClass = LumenResource<{
  code: string;
  description: string;
  featureCodes?: LumenCollection<FeatureCode>;
}>;

export type StatisticsResource = LumenResource<{
  key: string;
  description: string;
  value: number;
  type: 'count' | 'sum';
}>;
