import React from 'react';
import { getCountries } from '@api/countriesApi';
import { Continent, Country } from 'src/types/app';
import Table, { TableHeader } from '@components/Table';
import Pagination from '@components/Pagination';
import Page from '@components/Page';
import usePagination from '../../hooks/usePagination';

const CountriesPage = () => {
  const { data, isLoading, next, prev, hasMore, hasPrev } =
    usePagination<Country>(['countries'], (cursor) =>
      getCountries({
        page: { cursor, size: 7 },
      }),
    );

  return (
    <Page>
      <span className='leaflet-default-icon-path' />

      <section className='section'>
        <div className='is-ancestor'>
          <div className='tile is-12'>
            <div className='tile'>
              <div className='tile is-parent'>
                <article className='tile is-child box'>
                  <p className='title'>Countries</p>
                  <div className='table-container'>
                    {!isLoading && data?.length && (
                      <Table
                        headers={
                          [
                            { key: 'iso3166Alpha2', name: 'ISO 3166-2' },
                            { key: 'name', name: 'Name' },
                            { key: 'population', name: 'Population' },
                            { key: 'area', name: 'Area' },
                            { key: 'phoneCode', name: 'Phone Code' },
                          ] as TableHeader<Country>[]
                        }
                        data={data}
                      />
                    )}
                  </div>

                  <Pagination
                    hasMore={hasMore}
                    hasPrev={hasPrev}
                    onNext={() => next()}
                    onPrev={() => prev()}
                  />
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default CountriesPage;
