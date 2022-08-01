import { Icon, IconOptions, LatLngLiteral } from 'leaflet';
import React from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';

export interface ILocationMarker {
  position: LatLngLiteral;
}

const options: IconOptions = {
  iconUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon.png',
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.8.0/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.8.0/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
};

const LocationMarker = ({ position }: ILocationMarker) => {
  const map = useMap();

  map.flyTo(position);

  if (!position) {
    return <></>;
  }

  return (
    <Marker icon={new Icon(options)} position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};

export default LocationMarker;
