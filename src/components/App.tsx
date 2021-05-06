import React, { ReactElement, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { TableHeader, TableRow } from '../types/Table';
import Table from './Table';

const headers: TableHeader = ['a', 'b', 'c', 'd'];
const data: TableRow[] = [
  ['1', '2', '3', '4'],
  ['5', '6', '7', '8'],
];

const App = (): ReactElement => {
  useEffect(() => {
    console.log('here');
  }, []);

  return (
    <Container>
      <Table headers={headers} data={data} striped bordered hover />
    </Container>
  );
};

export default App;
