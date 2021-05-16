import React, { ReactElement } from 'react';
import { Container } from 'react-bootstrap';
import CountriesTable from '@layouts/CountriesTable';
import { QueryClient, QueryClientProvider } from 'react-query';

const App = (): ReactElement => {
  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <CountriesTable />
      </Container>
    </QueryClientProvider>
  );
};

export default App;
