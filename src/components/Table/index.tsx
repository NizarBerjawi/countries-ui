import TableCell from '@components/TableCell';
import TableRow from '@components/TableRow';
import React, { PropsWithChildren } from 'react';
import { Continent, Country } from 'src/types/app';

export type TableHeader<T> = {
  key: keyof T;
  name: string;
  type: boolean | number | string;
};

export interface ITable<T> {
  headers: TableHeader<T>[];
  data: T[];
}

const Table = (props: PropsWithChildren<ITable<Continent | Country>>) => (
  <table className='table is-striped is-fullwidth'>
    <thead>
      <TableRow>
        {props.headers.map(({ key, name }) => (
          <TableCell key={key} type='th'>
            {name}
          </TableCell>
        ))}
      </TableRow>
    </thead>
    <tbody>
      {props.data.map((item, index) => (
        <TableRow key={index}>
          {props.headers.map(({ key }) => (
            <TableCell key={`${key}-${index}`} type='td'>
              {item[key]}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </tbody>
  </table>
);

export default Table;
