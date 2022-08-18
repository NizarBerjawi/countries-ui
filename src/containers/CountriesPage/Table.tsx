import React, { Fragment } from 'react';
import { Country } from 'src/types/app';
import { getCountries } from '@api/countriesApi';
import Pagination from '@components/Pagination';
import Table, { TableHeader } from '@components/Table';
import usePagination from '../../hooks/usePagination';

const HEADERS: TableHeader<Country & { action?: string }>[] = [
  { key: 'iso3166Alpha2', name: 'ISO 3166-2', type: 'string' },
  { key: 'name', name: 'Name', type: 'string' },
  { key: 'population', name: 'Population', type: 'number' },
  { key: 'area', name: 'Area', type: 'area' },
  { key: 'phoneCode', name: 'Phone Code', type: 'string' },
  { key: 'action', name: 'Action' },
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
          <Table<Country & { action?: string }> headers={HEADERS} data={data} />
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
