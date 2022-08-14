import React, { Fragment } from 'react';
import { Country } from 'src/types/app';
import { getCountries } from '@api/countriesApi';
import Pagination from '@components/Pagination';
import Table, { TableHeader } from '@components/Table';
import usePagination from '../../hooks/usePagination';

const HEADERS: TableHeader<Country>[] = [
  { key: 'iso3166Alpha2', name: 'ISO 3166-2' },
  { key: 'name', name: 'Name' },
  { key: 'population', name: 'Population' },
  { key: 'area', name: 'Area' },
  { key: 'phoneCode', name: 'Phone Code' },
];

const CountryTable = () => {
  const { data, isSuccess, next, prev, hasMore, hasPrev } =
    usePagination<Country>(['countries'], (cursor) =>
      getCountries({
        page: { cursor, size: 7 },
      }),
    );

  return (
    <Fragment>
      <div className='table-container'>
        {isSuccess && data?.length && (
          <Table<Country> headers={HEADERS} data={data} />
        )}
      </div>
      <Pagination
        hasMore={hasMore}
        hasPrev={hasPrev}
        onNext={next}
        onPrev={prev}
      />
    </Fragment>
  );
};

export { CountryTable };
