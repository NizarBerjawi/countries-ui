import React from 'react';
import { getPaginatedContinents } from '@api/continentApi';
import { Continent, Country } from 'src/types/app';
import Table, { TableHeader } from '@components/Table';
import Pagination from '@components/Pagination';
import Page from '@components/Page';
import usePagination from '../../hooks/usePagination';

const ContinentsPage = () => {
  const { query, next, prev, hasMore, hasPrev } = usePagination(
    (cursor) => ['continents', cursor],
    (cursor) =>
      getPaginatedContinents({
        page: { cursor, size: 5 },
      }),
    {
      keepPreviousData: true,
    },
  );

  const continents = query?.data?.data || [];

  return (
    <Page>
      <section className='section'>
        <div className='is-ancestor'>
          <div className='tile is-12'>
            <div className='tile is-parent'>
              <article className='tile is-child box'>
                <p className='title'>Continents</p>
                <div className='table-container'>
                  {!query.isLoading && (
                    <Table
                      headers={
                        [
                          { key: 'code', name: 'Code' },
                          { key: 'name', name: 'Name' },
                        ] as TableHeader<Continent | Country>[]
                      }
                      data={continents}
                    />
                  )}
                </div>
                <Pagination
                  hasMore={hasMore()}
                  hasPrev={hasPrev()}
                  onNext={next}
                  onPrev={prev}
                />
              </article>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default ContinentsPage;
