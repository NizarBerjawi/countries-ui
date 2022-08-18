import React from 'react';
import { Collection, Resource } from 'src/types/api';
import TableData from '@components/TableData';
import TableRow from '@components/TableRow';

export interface ITable<T> {
  headers: TableHeader<T>[];
  data?: Collection<T>;
}
export interface TableHeader<T> {
  key: keyof T;
  name: string;
  type?: 'area' | 'number' | 'string';
}

const Table = <T extends Resource>({ headers, data }: ITable<T>) => (
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        {headers.map(({ key, name }: TableHeader<T>) => (
          <th key={key as string}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data &&
        data.map((item, index) => (
          <TableRow key={index}>
            {headers.map(({ key, type }) => (
              <TableData key={`${String(key)}-${index}`} type={type}>
                {item[key]}
              </TableData>
            ))}
          </TableRow>
        ))}
    </tbody>
  </table>
);

export default Table;
