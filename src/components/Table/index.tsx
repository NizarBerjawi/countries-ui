import TableData from '@components/TableData';
import TableRow from '@components/TableRow';
import React from 'react';
import { LumenCollection } from 'src/types/api';

export interface ITable {
  headers: TableHeader[];
  data: { [key in string]: string }[];
}

export interface TableHeader {
  key: string;
  name: string;
  type?: 'boolean' | 'number' | 'string';
}

const Table = (props: ITable) => (
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
            <TableData key={`${key}-${index}`}>{item[key]}</TableData>
          ))}
        </TableRow>
      ))}
    </tbody>
  </table>
);

export default Table;
