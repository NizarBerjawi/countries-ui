import { TableProps as BTableProps } from 'react-bootstrap';

export type TableHeaderData = string;
export type TableHeader = TableHeaderData[];
export type TableData = number | string;
export type TableRow = TableData[];

export interface TableProps extends BTableProps {
  headers: TableHeader;
  data: TableRow[];
}
