import React, { PropsWithChildren } from 'react';

const TableRow = (props: PropsWithChildren<unknown>) => (
  <tr>{props.children}</tr>
);

export default TableRow;
