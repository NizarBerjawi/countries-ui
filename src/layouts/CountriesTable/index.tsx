import React from 'react';
import { TableHeader } from '@components/Table/Table';
import Table from '@components/Table';
import { getCountries } from '@api/countriesApi';
import { useQuery } from 'react-query';

const headers: TableHeader = [
  'Code',
  'Name',
  'Area',
  'Population',
  'Phone Code',
];

const CountriesTable = (): React.ReactElement => {
  const { data, isLoading } = useQuery('countries', () =>
    getCountries({ page: 2 }),
  );

  console.log(data, isLoading);

  return <Table headers={headers} data={[]} striped bordered hover />;
};

export default CountriesTable;
