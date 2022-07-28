import React, { ChangeEvent, MouseEvent, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LatLngLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '@components/LocationMarker';
import Pagination from '@components/Pagination';
import { getHomepageStatistics } from '@api/statisticsApi';
import Number from '@components/Number';
import Page from '@components/Page';
import { getCountries } from '@api/countriesApi';
import Modal from '@components/Modal';
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

  const statisticsQuery = useQuery(['statistics'], () =>
    getHomepageStatistics(),
  );

  const paginatedCountries = usePagination<Country>(
    ['countries', countryName],
    (cursor) =>
      getCountries({
        page: { cursor, size: 5 },
        filter: {
          name: countryName,
        },
        include: 'location',
      }),
    {
      enabled: false,
    },
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };

  const handleSearchClick = (e: MouseEvent) => {
    e.preventDefault();

    paginatedCountries.refetch();

    setShowResults(true);
  };

  const handleSearchClose = (e: MouseEvent) => {
    setShowResults(false);

    paginatedCountries.remove();
  };

  const handleCountrySelect = (e: MouseEvent, country: Country) => {
    e.preventDefault();

    setShowResults(false);

    setSelectedCountry(country);

    if (country.location) {
      setMapCenter({
        lat: country.location.latitude,
        lng: country.location.longitude,
      });
    }

    paginatedCountries.remove();
  };

  const statistics = statisticsQuery?.data?.data || [];

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
        {paginatedCountries.isLoading && <>Loading...</>}

        {paginatedCountries.isSuccess &&
          paginatedCountries.data?.map((country: Country) => (
            <div
              key={country.iso3166Alpha2}
              className='box is-clickable'
              onClick={(e) => handleCountrySelect(e, country)}
            >
              {country.name}
            </div>
          ))}

        <Pagination
          hasMore={paginatedCountries.hasMore}
          hasPrev={paginatedCountries.hasPrev}
          onNext={() => paginatedCountries.next()}
          onPrev={() => paginatedCountries.prev()}
        />
      </Modal>
    </Page>
  );
};

export default HomePage;
