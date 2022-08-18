import { stringify } from 'qs';
import { CollectionResponse, Query } from 'src/types/api';
import { Country } from 'src/types/app';
import http from '@utils/http';

const getCountries = async (
  params?: Query,
): Promise<CollectionResponse<Country>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/countries${query}`);

  return data;
};

const getCountry = async (
  countryCode: Country['iso3166Alpha2'],
  params?: Query,
): Promise<CollectionResponse<Country>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/countries/${countryCode}${query}`);

  return data;
};

const getCountryGeometry = async (
  countryCode: Country['iso3166Alpha2'],
  params?: Query,
): Promise<CollectionResponse<Country>> => {
  const query = stringify(params, { addQueryPrefix: true });

  const { data } = await http.get(`/countries/${countryCode}/geometry${query}`);

  return data;
};

export { getCountry, getCountries, getCountryGeometry };
