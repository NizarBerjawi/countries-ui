import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPaginatedContinents } from '@api/continentApi';
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
    return (
      <div className='container is-fluid'>
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

  if (continents.length === 0) {
    return <p>No data found.</p>;
  }

  return (
    <div className='container is-fluid'>
      <section className='section'>
        <div className='columns is-widescreen is-multiline is-centered'>
          {continents.map((continent: Continent) => (
            <div key={continent.code} className='column is-one-third'>
              <div className='card is-clickable'>
                <div className='card-content'>
                  <p className='title'>{continent.name}</p>
                </div>
                <div className='card-image'>
                  <figure className='image is-4by3'>
                    <img
                      src='https://bulma.io/images/placeholders/1280x960.png'
                      alt='Placeholder image'
                    />
                  </figure>
                </div>
              </div>
            </div>
          ))}
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
