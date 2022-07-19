import React, { useState } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { getPaginatedContinents } from '@api/continentApi';
import { getPaginatedCountries } from '@api/countriesApi';
import { Continent, Country } from 'src/types/app';
import ProgressBar from '@components/ProgressBar';
import NavBar from '@components/NavBar';
import { INavBarItem } from '@components/NavBarItem';
import Table, { TableHeader } from '@components/Table';
import Pagination from '@components/Pagination';
import {
  getPreviousCursor,
  getNextCursor,
  hasPrevious,
  hasNext,
} from '@utils/pagination';
import { AxiosResponse } from 'axios';
import { LumenCollectionResponse } from 'src/types/api';
import { MapContainer, TileLayer } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import LocationMarker from '@components/LocationMarker';
import { getHomepageStatistics } from '@api/statisticsApi';
import Number from '@components/Number';

const LINKS: INavBarItem[] = [
  { path: '/', label: 'Home' },
  { path: '/continents', label: 'Continents' },
  { path: '/countries', label: 'Countries' },
  { path: '/languages', label: 'Languages' },
  { path: '/currencies', label: 'Currencies' },
  { path: '/timeZones', label: 'Time Zones' },
  { path: '/statistics', label: 'Statistics' },
];

const redOptions: PathOptions = { color: 'red' };

const HomePage = () => {
  const [cursors, setCursors] = useState<{ [key: string]: string | undefined }>(
    {},
  );

  const statisticsQuery = useQuery(['statistics'], () =>
    getHomepageStatistics(),
  );

  const continentsQuery = useQuery(
    ['continents', cursors.continents],
    () =>
      getPaginatedContinents({
        page: { cursor: cursors.continents, size: 5 },
      }),
    {
      keepPreviousData: true,
    },
  );

  const countriesQuery = useQuery(
    ['countries', cursors.countries],
    () =>
      getPaginatedCountries({
        page: { cursor: cursors.countries, size: 5 },
      }),
    {
      keepPreviousData: true,
    },
  );

  const loadNext = (
    query: UseQueryResult<AxiosResponse<LumenCollectionResponse<any>>>,
    key: string,
  ) => {
    if (!query.isPreviousData && hasNext(query)) {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [`${key}`]: getNextCursor(query),
      }));
    }
  };

  const loadPrev = (
    query: UseQueryResult<AxiosResponse<LumenCollectionResponse<any>>>,
    key: string,
  ) => {
    if (!query.isPreviousData && hasPrevious(query)) {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [`${key}`]: getPreviousCursor(query),
      }));
    }
  };

  // if (continentsQuery.isLoading && countriesQuery.isLoading) {
  //   return (
  //     <ProgressBar size='small' color='primary' max='100' percentage='15%' />
  //   );
  // }

  const continents = continentsQuery?.data?.data.data || [];
  const countries = countriesQuery?.data?.data.data || [];
  const statistics = statisticsQuery?.data?.data.data || [];

  return (
    <div className='container is-fluid'>
      <NavBar hasBrand links={LINKS} />
      <span className='leaflet-default-icon-path' />

      <section className='section'>
        <div className='is-ancestor'>
          <div className='tile is-parent is-12'>
            <div className='tile box'>
              {statistics.map((item) => (
                <article key={item.key} className='tile is-child is-2'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>{item.description}</p>
                      <p className='title'>
                        <Number>{item.value}</Number>
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className='is-ancestor'>
          <div className='tile is-12'>
            <div className='tile is-vertical is-4'>
              <div className='tile is-parent'>
                <article className='tile is-child box'>
                  <p className='title'>Continents</p>
                  <div className='table-container'>
                    <Table
                      headers={
                        [
                          { key: 'code', name: 'Code' },
                          { key: 'name', name: 'Name' },
                        ] as TableHeader<Continent | Country>[]
                      }
                      data={continents}
                    />
                  </div>
                  <Pagination
                    hasMore={hasNext(continentsQuery)}
                    hasPrev={hasPrevious(continentsQuery)}
                    onNext={() => loadNext(continentsQuery, 'continents')}
                    onPrev={() => loadPrev(continentsQuery, 'continents')}
                  />
                </article>
              </div>

              <div className='tile is-parent'>
                <article className='tile is-child box'>
                  <p className='title'>Countries</p>
                  <div className='table-container'>
                    <Table
                      headers={
                        [
                          { key: 'iso3166Alpha2', name: 'ISO 3166-2' },
                          { key: 'name', name: 'Name' },
                          // { key: 'population', name: 'Population' },
                          // { key: 'area', name: 'Area' },
                          // { key: 'phoneCode', name: 'Phone Code' },
                        ] as TableHeader<Continent | Country>[]
                      }
                      data={countries}
                    />
                  </div>

                  <Pagination
                    hasMore={hasNext(countriesQuery)}
                    hasPrev={hasPrevious(countriesQuery)}
                    onNext={() => loadNext(countriesQuery, 'countries')}
                    onPrev={() => loadPrev(countriesQuery, 'countries')}
                  />
                </article>
              </div>
            </div>
            <div className='tile is-parent'>
              <article className='tile is-child box'>
                <MapContainer
                  center={[7.18805555556, 21.0936111111]}
                  zoom={3}
                  scrollWheelZoom={false}
                  className='image is-4by3'
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <LocationMarker />
                  {/*
                  <Marker icon={new Icon(options)} position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker> */}
                  {/* <FeatureGroup pathOptions={redOptions}>
                    <GeoJSON data={world110m} />
                  </FeatureGroup> */}
                </MapContainer>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
