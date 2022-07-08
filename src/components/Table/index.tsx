import React from 'react';
import { Continent, Country } from 'src/types/app';

export type TableHeader<T> = {
  key: keyof T;
  name: string;
};

export interface ITable<T> {
  headers: TableHeader<T>[];
  data: T[];
}

const Table = (props: ITable<Continent | Country>) => (
  <table className='table is-fullwidth has-background-light'>
    <thead>
      <tr>
        {props.headers.map(({ key, name }) => (
          <th key={key}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {props.data.map((item, index) => (
        <tr key={index}>
          {props.headers.map(({ key }) => (
            <td key={key}>{item[key]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Table;
