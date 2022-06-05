import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPaginatedContinents } from '@api/continentApi';
import { Continent } from 'src/types/app';
import LoadMore from '@components/LoadMore';
import ContinentCard from '@components/ContinentCard';
import CardList from '@components/CardList';
import world110m from '../../data/world110m';
import ProgressBar from '@components/ProgressBar';

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
        include: 'countries',
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
    return (
      <ProgressBar size='small' color='primary' max='100' percentage='15%' />
    );
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
          {continents.map((continent: Continent) => {
            const continentFeatures = world110m.features.filter(
              (data) => data.properties?.CONTINENT === continent.name,
            );

            const featureCollection = {
              ...world110m,
              features: continentFeatures,
            };

            return (
              <ContinentCard
                key={continent.code}
                continent={continent}
                data={featureCollection}
              />
            );
          })}
        </CardList>

        {hasMore() && (
          <LoadMore label='Load More...' size='large' onClick={loadMore} />
        )}
      </section>
    </div>
  );
};

export default HomePage;
