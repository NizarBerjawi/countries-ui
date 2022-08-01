import React, { PropsWithChildren } from 'react';

const TableData = (props: PropsWithChildren<unknown>) => (
  <td>{props.children}</td>
);

export default TableData;
