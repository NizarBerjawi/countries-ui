import React, { PropsWithChildren } from 'react';

export interface ITableCell {
  type?: 'td' | 'th';
}

const TableCell = ({ type, children }: PropsWithChildren<ITableCell>) => {
  if (type === 'th') {
    return <th>{children}</th>;
  }

  return <td>{children}</td>;
};

export default TableCell;
