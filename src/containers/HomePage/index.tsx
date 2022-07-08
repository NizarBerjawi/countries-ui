import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getPaginatedContinents } from '@api/continentApi';
import { getPaginatedCountries } from '@api/countriesApi';
import { Continent, Country } from 'src/types/app';
import LoadMore from '@components/LoadMore';
import ContinentCard from '@components/ContinentCard';
import CardList from '@components/CardList';
import world110m from '../../data/world110m';
import ProgressBar from '@components/ProgressBar';
import NavBar from '@components/NavBar';
import { INavBarItem } from '@components/NavBarItem';
import Table, {TableHeader} from '@components/Table';

const FIRST_PAGE = 1;
const LINKS: INavBarItem[] = [
  { path: '/', label: 'Home' },
  { path: '/continents', label: 'Continents' },
  { path: '/countries', label: 'Countries' },
  { path: '/languages', label: 'Languages' },
  { path: '/currencies', label: 'Currencies' },
  { path: '/timeZones', label: 'Time Zones' },
  { path: '/statistics', label: 'Statistics' },
];

const HomePage = () => {
  const [pages, setPages] = useState<{ [key: string]: number }>({
    continents: FIRST_PAGE,
    countries: FIRST_PAGE,
  });

  const continentsQuery = useQuery(
    ['continents', pages.continents],
    () =>
      getPaginatedContinents({
        page: { number: pages.continents },
        include: 'countries',
      }),
    {
      keepPreviousData: true,
    },
  );

  const countriesQuery = useQuery(
    ['countries', pages.countries],
    () =>
      getPaginatedCountries({
        page: { number: pages.countries },
      }),
    {
      keepPreviousData: true,
    },
  );

  const getQuery = (queryKey: string) => {
    switch (queryKey) {
      case 'continents':
        return continentsQuery;
      case 'countries':
        return countriesQuery;
      default:
        throw new Error('Invalid query');
    }
  };

  const hasMore = (queryKey: string) =>
    !!getQuery(queryKey).data?.data.links.next;

  const loadMore = (queryKey: string) => {
    const query = getQuery(queryKey);

    if (!query.isPreviousData && hasMore(queryKey)) {
      setPages((prevPages) => ({
        ...prevPages,
        [`${queryKey}`]: prevPages[`${queryKey}`] + 1,
      }));
    }
  };


  if (continentsQuery.isLoading && countriesQuery.isLoading) {
    return (
      <ProgressBar size='small' color='primary' max='100' percentage='15%' />
    );
  }

  const continents = continentsQuery?.data?.data.data || [];
  const countries = countriesQuery?.data?.data.data || [];

  return (
    <div className='container is-fluid'>
      <NavBar hasBrand links={LINKS} />
      <section className='section'>
        <div className='tile is-ancestor'>
          <div className='tile is-vertical is-8'>
            <div className='tile is-parent'>
              <article className='tile is-child notification'>
                <p className='title'>Countries</p>
                <Table
                  headers={[
                    { key: 'iso3166Alpha2', name: 'ISO 3166-2' },
                    { key: 'name', name: 'Name' },
                    { key: 'population', name: 'Population' },
                    { key: 'area', name: 'Area' },
                    { key: 'phoneCode', name: 'Phone Code' },
                  ] as TableHeader<Continent | Country>[]}
                  data={countries}
                />

                {hasMore('countries') && (
                  <LoadMore
                    label='Load More...'
                    size='large'
                    onClick={() => loadMore('countries')}
                  />
                )}
              </article>
            </div>

            <div className='tile is-parent'>
              <article className='tile is-child notification'>
                <p className='title'>Continents</p>
                <table className='table is-fullwidth has-background-light'>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {continents.map((continent: Continent) => (
                      <tr key={continent.code}>
                        <td>{continent.code}</td>
                        <td>{continent.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {hasMore('continents') && (
                  <LoadMore
                    label='Load More...'
                    size='large'
                    onClick={() => loadMore('continents')}
                  />
                )}
              </article>
            </div>
            <div className='tile'>
              <div className='tile is-parent is-vertical'>
                <article className='tile is-child notification is-warning'>
                  <p className='title'>...tiles</p>
                  <p className='subtitle'>Bottom tile</p>
                </article>
              </div>

              <div className='tile is-parent'>
                <article className='tile is-child notification is-info'>
                  <p className='title'>Middle tile</p>
                  <p className='subtitle'>With an image</p>
                  <figure className='image is-4by3'>
                    <img src='https://bulma.io/images/placeholders/640x480.png' />
                  </figure>
                </article>
              </div>
            </div>

            <div className='tile is-parent'>
              <article className='tile is-child notification is-danger'>
                <p className='title'>Wide tile</p>
                <p className='subtitle'>Aligned with the right tile</p>
                <div className='content'></div>
              </article>
            </div>
          </div>
          <div className='tile is-parent'>
            <article className='tile is-child notification is-success'>
              <div className='content'>
                <p className='title'>Tall tile</p>
                <p className='subtitle'>With even more content</p>
                <div className='content'></div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
