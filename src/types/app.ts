export interface Continent {
  name: string;
  code: string;
  countries?: Country[];
}

export interface Country {
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
  timeZones?: TimeZone[];
  neighbours?: Country[];
  languages?: Language[];
  alternateNames?: AlternateName[];
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Currency {
  code: string;
  name: string;
  countries?: Country[];
}

export interface Flag {
  filename: string;
  url: string;
  country?: Country;
}

export interface TimeZone {
  code: string;
  timeZone: string;
  gmtOffset: string;
  country?: Country;
}

export interface Language {
  name: string;
  'iso639.1': string;
  'iso639.2': string;
  'iso639.3': string;
  countries: Country[];
}

export interface AlternateName {
  name: string;
  isPrefferedName: string;
  isShortName: string;
  isHistoric: boolean;
  isColliquial: boolean;
  language?: Language;
  place?: Place;
}

export interface Place {
  geonameId: number;
  name: string;
  asciiName: string;
  population: number;
  elevation: number;
  dem: number;
  alternateNames?: AlternateName[];
  timeZone?: TimeZone;
  featureCode?: FeatureCode;
  featureClass?: FeatureClass;
  country?: Country;
  location?: Location;
}

export interface FeatureCode {
  code: string;
  shortDescription: string;
  fullDescription: string;
  featureClass?: FeatureClass;
}

export interface FeatureClass {
  code: string;
  description: string;
  featureCodes?: FeatureCode[];
}