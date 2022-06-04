import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPaginatedContinents } from '@api/continentApi';
import { Continent } from 'src/types/app';
import LoadMore from '@components/LoadMore';
import ContinentCard from '@components/ContinentCard';
import CardList from '@components/CardList';

const FIRST_PAGE = 1;

const HomePage = () => {
  const [page, setPage] = useState(FIRST_PAGE);
  const {
    isLoading,
    isError,
    data: response,
    isPreviousData,
  } = useQuery(
    ['Continents', page],
    () =>
      getPaginatedContinents({
        page: { number: page },
        include: ['countries'],
      }),
    {
      keepPreviousData: true,
    },
  );

  const hasMore = () => !!response?.data.links.next;

  const loadMore = () => {
    if (!isPreviousData && hasMore()) {
      setPage((old) => old + 1);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }

  const continents = response?.data.data || [];

  if (continents.length === 0) {
    return <p>No data found.</p>;
  }

  return (
    <div className='container is-fluid'>
      <section className='section'>
        <CardList centered>
          {continents.map((continent: Continent) => (
            <ContinentCard key={continent.code} continent={continent} />
          ))}
        </CardList>

        {hasMore() && (
          <LoadMore label='Load More...' size='large' onClick={loadMore} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
