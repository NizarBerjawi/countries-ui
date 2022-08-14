import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React, { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContinentPage from '../ContinentPage';
import ContinentsPage from '../ContinentsPage';
import CountriesPage from '../CountriesPage';
import HomePage from '../HomePage';

const App = (): ReactElement => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/continents' element={<ContinentsPage />} />
          <Route
            path='/continents/:continentCode'
            element={<ContinentPage />}
          />
          <Route path='/countries' element={<CountriesPage />} />
        </Routes>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
