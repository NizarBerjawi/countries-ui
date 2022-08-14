import React, { PropsWithChildren } from 'react';
import { LumenCollection, LumenResource } from 'src/types/api';

export interface ITable<T> {
  headers: TableHeader<T>[];
  data?: LumenCollection<T>;
}

export interface TableHeader<T> {
  key: keyof T;
  name: string;
  type?: 'boolean' | 'number' | 'string';
}

const Table = <T extends LumenResource>({
  headers,
  children,
}: PropsWithChildren<ITable<T>>) => (
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        {headers.map(({ key, name }: TableHeader<T>) => (
          <th key={key as string}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </table>
);

export default Table;
