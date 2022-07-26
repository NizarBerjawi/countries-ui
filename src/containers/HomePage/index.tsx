import React, {
  ChangeEvent,
  MouseEvent,
  MouseEventHandler,
  useState,
} from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { LatLng, LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '@components/LocationMarker';
import Pagination from '@components/Pagination';
import { getHomepageStatistics } from '@api/statisticsApi';
import Number from '@components/Number';
import Page from '@components/Page';
import { getCountries } from '@api/countriesApi';
import Modal from '@components/Modal';
import {
  hasNext,
  getNextCursor,
  hasPrevious,
  getPreviousCursor,
} from '@utils/pagination';
import { LumenCollectionResponse } from 'src/types/api';
import { Country } from 'src/types/app';
import usePagination from '../../hooks/usePagination';

// const redOptions: PathOptions = { color: 'red' };

const HomePage = () => {
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>({
    lat: 7.18805555556,
    lng: 21.0936111111,
  });
  const [countryName, setCountryName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [showResults, setShowResults] = useState(false);
  const [cursors, setCursors] = useState<{ [key: string]: string | undefined }>(
    {},
  );

  const statisticsQuery = useQuery(['statistics'], () =>
    getHomepageStatistics(),
  );

  const countriesQuery = useQuery(
    ['countries', countryName, cursors.countries],
    () =>
      getCountries({
        page: { cursor: cursors.countries, size: 5 },
        filter: {
          name: countryName,
        },
        include: 'location',
      }),
    {
      enabled: !!cursors.countries || false,
      keepPreviousData: true,
    },
  );

  const { query, next, prev, hasMore, hasPrev } = usePagination(
    getCountries,
    'countries',
  );

  const loadNext = (
    query: UseQueryResult<LumenCollectionResponse<Country>>,
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
    query: UseQueryResult<LumenCollectionResponse<Country>>,
    key: string,
  ) => {
    if (!query.isPreviousData && hasPrevious(query)) {
      setCursors((prevCursors) => ({
        ...prevCursors,
        [`${key}`]: getPreviousCursor(query),
      }));
    }
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };

  const handleSearchClick = (e: MouseEvent) => {
    e.preventDefault();

    countriesQuery.refetch();

    setShowResults(true);
  };

  const handleSearchClose = (e: MouseEvent) => {
    setShowResults(false);
  };

  const handleCountrySelect = (e: MouseEvent, country: Country) => {
    e.preventDefault();

    setSelectedCountry(country);

    if (country.location) {
      setMapCenter({
        lat: country.location.latitude,
        lng: country.location.longitude,
      });
    }
    setShowResults(false);
  };

  const statistics = statisticsQuery?.data?.data || [];
  const countries = countriesQuery?.data?.data || [];

  return (
    <Page>
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
          <div className='tile'>
            <div className='tile is-parent is-justify-content-center	'>
              <div className='tile is-vertical'>
                <article className='tile is-child'>
                  <div className='field has-addons'>
                    <div className='control is-expanded'>
                      <input
                        className='input is-fullwidth is-large'
                        type='text'
                        placeholder='e.g. Australia'
                        onChange={handleSearchChange}
                      />
                    </div>
                    <div className='control'>
                      <a
                        className='button is-primary is-large'
                        onClick={handleSearchClick}
                      >
                        Search
                      </a>
                    </div>
                  </div>
                </article>

                <div className='tile is-child'>
                  <MapContainer
                    center={mapCenter}
                    zoom={3}
                    scrollWheelZoom={false}
                    className='image is-4by3'
                    style={{ zIndex: -1 }}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <LocationMarker position={mapCenter} />
                  </MapContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal active={showResults} onClose={handleSearchClose}>
        {countriesQuery.isLoading && <>Loading...</>}

        {countriesQuery.isSuccess &&
          countries.map((country) => (
            <div
              key={country.iso3166Alpha2}
              className='box is-clickable'
              onClick={(e) => handleCountrySelect(e, country)}
            >
              {country.name}
            </div>
          ))}

        <Pagination
          hasMore={hasNext(countriesQuery)}
          hasPrev={hasPrevious(countriesQuery)}
          onNext={() => loadNext(countriesQuery, 'countries')}
          onPrev={() => loadPrev(countriesQuery, 'countries')}
        />
      </Modal>
    </Page>
  );
};

export default HomePage;
