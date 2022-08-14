import { useQuery } from '@tanstack/react-query';
import { LatLngLiteral } from 'leaflet';
import React, {
  ChangeEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Country } from 'src/types/app';
import { useDebounce } from 'use-debounce';
import { getCountries } from '@api/countriesApi';
import { getHomepageStatistics } from '@api/statisticsApi';
import Icon from '@components/Icon';
import LocationMarker from '@components/LocationMarker';
import Modal from '@components/Modal';
import Number from '@components/Number';
import Page from '@components/Page';
import Pagination from '@components/Pagination';
import usePagination from '../../hooks/usePagination';

const CENTER: LatLngLiteral = {
  lat: 7.18805555556,
  lng: 21.0936111111,
};

const HomePage = () => {
  const [mapCenter, setMapCenter] = useState<LatLngLiteral>(CENTER);
  const inputElement = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [selectedCountry, setSelectedCountry] = useState<Country>();
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.focus();
    }
  }, [showSearchModal]);

  const statisticsQuery = useQuery(['statistics'], () =>
    getHomepageStatistics(),
  );

  const paginatedCountries = usePagination<Country>(
    ['countries', debouncedQuery],
    (cursor) =>
      getCountries({
        page: { cursor, size: 5 },
        filter: {
          name: debouncedQuery,
        },
        include: ['location'],
      }),
    {
      enabled: !!(showSearchModal && debouncedQuery),
      keepPreviousData: !!(showSearchModal && debouncedQuery),
    },
  );

  const handleSearchClick = (e: MouseEvent) => {
    e.preventDefault();

    setShowSearchModal(true);
  };

  const handleSearchClose = (e: MouseEvent) => {
    e.preventDefault();

    setShowSearchModal(false);

    setSearchQuery('');

    paginatedCountries.remove();
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCountrySelect = (e: MouseEvent, country: Country) => {
    e.preventDefault();

    setSelectedCountry(country);

    setShowSearchModal(false);

    setSearchQuery('');

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
      <section>
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
                        value={selectedCountry?.name || ''}
                        onClick={handleSearchClick}
                        readOnly
                      />
                    </div>
                  </div>
                </article>

                <div className='tile is-child'>
                  <MapContainer
                    center={mapCenter}
                    zoom={3}
                    scrollWheelZoom={true}
                    className='image is-4by3'
                    style={{ zIndex: 1 }}
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

      <Modal
        active={showSearchModal}
        fixed={true}
        onClose={handleSearchClose}
        showFooter={paginatedCountries.hasMore || paginatedCountries.hasPrev}
        footer={
          <div className='is-fullwidth'>
            <Pagination
              hasMore={paginatedCountries.hasMore}
              hasPrev={paginatedCountries.hasPrev}
              onNext={() => paginatedCountries.next()}
              onPrev={() => paginatedCountries.prev()}
            />
          </div>
        }
      >
        <div className='control has-icons-left has-icons-right mb-5'>
          <input
            ref={inputElement}
            type='text'
            className='input is-fullwidth is-large'
            placeholder='e.g. Australia'
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <span className='icon is-medium is-left'>
            <Icon name='search' />
          </span>
        </div>

        {!paginatedCountries.isSuccess && <>No recent search results</>}
        {paginatedCountries.data?.length === 0 && <>No results found</>}

        {paginatedCountries.isSuccess &&
          paginatedCountries.data?.map((country: Country) => (
            <div
              key={country.iso3166Alpha2}
              className='box is-clickable is-hoverable'
              onClick={(e) => handleCountrySelect(e, country)}
            >
              {country.name}
            </div>
          ))}
      </Modal>
    </Page>
  );
};

export default HomePage;
