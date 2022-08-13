import TableData from '@components/TableData';
import TableRow from '@components/TableRow';
import React, { PropsWithChildren } from 'react';
import { LumenResource, LumenValue } from 'src/types/api';

export interface ITable {
  headers: TableHeader[];
  data: Record<string, any>[];
}

export type TableHeader<T = LumenResource> = {
  key: keyof T;
  name: string;
  type?: 'boolean' | 'number' | 'string';
};

const Table = (props: PropsWithChildren<ITable>) => (
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        {props.headers.map(({ key, name }) => (
          <th key={key}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.data &&
        props.data.map((item, index) => (
          <TableRow key={index}>
            {props.headers &&
              props.headers.map(({ key }) => (
                <TableData key={`${key}-${index}`}>{item[key]}</TableData>
              ))}
          </TableRow>
        ))}
    </tbody>
  </table>
);

export default Table;
