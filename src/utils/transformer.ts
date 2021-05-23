import _ from 'lodash';
import { LumenCollection, LumenResource } from 'src/types';

// Transform any fetched data
const fetch = (
  data: LumenResource | LumenCollection,
): LumenResource | LumenCollection => {
  if (data && Array.isArray(data)) {
    return collection(data) as LumenCollection;
  }

  if (data && typeof data === 'object') {
    return resource(data) as LumenResource;
  }

  return data;
};

// Transform a fetched resource
const resource = (resource: LumenResource): LumenResource => {
  const data: LumenResource = {};

  const keys = Object.keys(resource);

  keys.forEach((key) => (data[_.camelCase(key)] = fetch(resource[key])));

  return data;
};

// Transform a fetched collection
const collection = (
  data: LumenCollection,
): (LumenResource | LumenCollection)[] =>
  data.map((item: LumenResource) => fetch(item));

export { fetch, resource, collection };
