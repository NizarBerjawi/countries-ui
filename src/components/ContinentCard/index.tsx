import React from 'react';
import { Continent } from 'src/types/app';
import { MapContainer, FeatureGroup } from 'react-leaflet';
import { PathOptions } from 'leaflet';
import geoJsonData from '../../data/world-110m.json';
import continentLocations from '../../data/continent_locations.json';
import { GeoJSON } from 'react-leaflet';
import _ from 'lodash';

interface IContinentCardProps {
  continent: Continent;
}
const redOptions: PathOptions = { color: 'red' };

const getGeoJsonData = () => {
  _.groupBy(geoJsonData, )
}

const ContinentCard = ({ continent }: IContinentCardProps) => {

  const continentData = geoJsonData.features.filter((data) => data.properties.CONTINENT ===  continent.name);

  return <div className='column is-one-third'>
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
            <GeoJSON data={continentData} />
          </FeatureGroup>
        </MapContainer>
      </div>
    </div>
  </div>
};

export default ContinentCard;
