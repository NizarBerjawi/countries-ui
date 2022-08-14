import React, { Fragment } from 'react';
import { Continent } from 'src/types/app';
import { getPaginatedContinents } from '@api/continentApi';
import Pagination from '@components/Pagination';
import Table, { TableHeader } from '@components/Table';
import TableData from '@components/TableData';
import TableRow from '@components/TableRow';
import usePagination from '../../hooks/usePagination';

const HEADERS: TableHeader<Continent & { action: boolean }>[] = [
  { key: 'code', name: 'Code' },
  { key: 'name', name: 'Name' },
  { key: 'action', name: '' },
];

const ContinentTable = () => {
  const { data, isSuccess, next, prev, hasMore, hasPrev } =
    usePagination<Continent>(['continents'], (cursor) =>
      getPaginatedContinents({
        page: { cursor, size: 7 },
      }),
    );

  return (
    <Fragment>
      <div className='table-container'>
        {isSuccess && data?.length && (
          <Table<Continent> headers={HEADERS}>
            {data.map((item, index) => (
              <TableRow key={index}>
                {HEADERS.map(({ key }) => (
                  <TableData key={`${key as string}-${index}`}>
                    {item[key]}
                  </TableData>
                ))}
              </TableRow>
            ))}
          </Table>
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

export { ContinentTable };
