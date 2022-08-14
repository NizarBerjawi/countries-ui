import TableData from '@components/TableData';
import TableRow from '@components/TableRow';
import React from 'react';
import { LumenCollection, LumenResource } from 'src/types/api';
export interface ITable<T> {
  headers: TableHeader<T>[];
  data: LumenCollection<T>;
}

export interface TableHeader<T> {
  key: keyof T;
  name: string;
  type?: 'boolean' | 'number' | 'string';
}

const Table = <T extends LumenResource>({ headers, data }: ITable<T>) => (
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        {headers.map(({ key, name }: TableHeader<T>) => (
          <th key={key as string}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => (
        <TableRow key={index}>
          {headers.map(({ key }: TableHeader<T>) => (
            <TableData key={`${key as string}-${index}`}>{item[key]}</TableData>
          ))}
        </TableRow>
      ))}
    </tbody>
  </table>
);

export default Table;
