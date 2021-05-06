import React, { ReactElement } from 'react';
import { Table as BTable } from 'react-bootstrap';
import TableProps, { TableRow, TableData } from '../../types/Table';

const Table = ({ headers, data, ...rest }: TableProps): ReactElement => (
  <BTable {...rest}>
    {headers.length > 0 && (
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
    )}
    <tbody>
      {data.length > 0 &&
        data.map((row: TableRow, index) => (
          <tr key={index}>
            {row.map((item: TableData) => (
              <td key={index}>{item}</td>
            ))}
          </tr>
        ))}

      {data.length === 0 && (
        <tr>
          <td colSpan={headers.length}>No data available.</td>
        </tr>
      )}
    </tbody>
  </BTable>
);

export default Table;
