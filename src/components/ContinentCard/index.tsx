import React from 'react';
import { Continent } from 'src/types/app';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

interface IContinentCardProps {
  continent: Continent;
}
const position: LatLngTuple = [51.505, -0.09];

const ContinentCard = ({ continent }: IContinentCardProps) => (
  <div className='column is-one-third'>
    <div className='card is-clickable'>
      <div className='card-content'>
        <p className='title'>{continent.name}</p>
      </div>
      <div className='card-image'>
          <MapContainer className='image is-4by3' center={position} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
      </div>
    </div>
  </div>
);

export default ContinentCard;
