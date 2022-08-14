import type { FeatureCollection } from 'geojson';
import { PathOptions } from 'leaflet';
import React from 'react';
import { FeatureGroup, GeoJSON, MapContainer } from 'react-leaflet';
import { Continent } from 'src/types/app';
import continentLocations from '../../data/continentLocations';

interface IContinentCardProps {
  continent: Continent;
  data: FeatureCollection;
}

const redOptions: PathOptions = { color: 'red' };

const ContinentCard = ({ continent, data }: IContinentCardProps) => {
  return (
    <div className='column is-one-third'>
      <div className='card is-clickable'>
        <div className='card-content'>
          <p className='title'>{continent.name}</p>
        </div>

        <div className='card-image'>
          <MapContainer
            center={continentLocations[continent.code]}
            zoom={3}
            scrollWheelZoom={false}
            className='image is-4by3'
          >
            <FeatureGroup pathOptions={redOptions}>
              <GeoJSON data={data} />
            </FeatureGroup>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ContinentCard;
