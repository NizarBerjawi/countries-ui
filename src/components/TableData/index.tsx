import React, { PropsWithChildren } from 'react';
import Area from '@components/Area';
import Number from '@components/Number';

interface ITableData {
  type?: 'area' | 'number' | 'string';
}

const TableData = ({ type, children }: PropsWithChildren<ITableData>) => {
  if (typeof children === 'number') {
    if (type === 'area') {
      return (
        <td>
          <Area>{children}</Area>
        </td>
      );
    }

    if (type == 'number') {
      return (
        <td>
          <Number>{children}</Number>
        </td>
      );
    }
  }

  return <td>{children}</td>;
};

export default TableData;
