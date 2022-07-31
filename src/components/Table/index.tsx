import TableRow from '@components/TableRow';
import React from 'react';
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

const Table = (props: ITable<Continent | Country>) => (
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        {props.headers.map(({ key, name }) => (
          <th key={key}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.data.map((item, index) => (
        <TableRow key={index}>
          {props.headers.map(({ key }) => (
            <td key={`${key}-${index}`}>{item[key]}</td>
          ))}
        </TableRow>
      ))}
    </tbody>
  </table>
);

export default Table;
