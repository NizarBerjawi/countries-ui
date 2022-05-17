import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getContinents } from '@api/continentApi';
import { Continent } from 'src/types';

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
    () => getContinents({ page: { number: page } }),
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
      <div className='container is-fluid'>index
        <section className='section'>
          <progress className='progress is-small is-primary' max='100'>
            15%
          </progress>
        </section>
      </div>
    );
  }

  if (isError) {
    return <p>Error...</p>;
  }

  const continents = response?.data.data || [];

  return (
    <div className='container is-fluid'>
      <section className='section'>
        <div className='tile is-ancestor'>
          {continents?.map((continent: Continent) => {
            return (
              <div
                className='tile is-child is-clickable'
                key={continent.code}
              >
                {continent.name}
              </div>
            );
          })}
        </div>

        {hasMore() && (
          <div className='is-flex is-flex-direction-row is-justify-content-center'>
            <span className='tag is-large is-clickable' onClick={loadMore}>
              Load more...
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
