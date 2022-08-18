import { Collection, Resource } from './api';

export type Continent = Resource<{
  name: string;
  code: string;
  countries?: Collection<Country>;
}>;

export type Country = Resource<{
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
  timeZones?: Collection<TimeZone>;
  neighbours?: Collection<Country>;
  languages?: Collection<Language>;
  alternateNames?: Collection<AlternateName>;
}>;

export type Location = Resource<{
  latitude: number;
  longitude: number;
}>;

export type Currency = Resource<{
  code: string;
  name: string;
  countries?: Collection<Country>;
}>;

export type Flag = Resource<{
  filename: string;
  url: string;
  country?: Country;
}>;

export type TimeZone = Resource<{
  code: string;
  timeZone: string;
  gmtOffset: string;
  country?: Country;
}>;

export type Language = Resource<{
  name: string;
  'iso639.1': string;
  'iso639.2': string;
  'iso639.3': string;
  countries: Collection<Country>;
}>;

export type AlternateName = Resource<{
  name: string;
  isPrefferedName: string;
  isShortName: string;
  isHistoric: boolean;
  isColliquial: boolean;
  language?: Language;
  place?: Place;
}>;

export type Place = Resource<{
  geonameId: number;
  name: string;
  asciiName: string;
  population: number;
  elevation: number;
  dem: number;
  alternateNames?: Collection<AlternateName>;
  timeZone?: TimeZone;
  featureCode?: FeatureCode;
  featureClass?: FeatureClass;
  country?: Country;
  location?: Location;
}>;

export type FeatureCode = Resource<{
  code: string;
  shortDescription: string;
  fullDescription: string;
  featureClass?: FeatureClass;
}>;

export type FeatureClass = Resource<{
  code: string;
  description: string;
  featureCodes?: Collection<FeatureCode>;
}>;

export type StatisticsResource = Resource<{
  key: string;
  description: string;
  value: number;
  type: 'count' | 'sum';
}>;
