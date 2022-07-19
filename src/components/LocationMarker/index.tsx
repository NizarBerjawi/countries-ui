import { Icon, IconOptions, LatLng, LeafletMouseEvent } from 'leaflet';
import React, { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

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

const LocationMarker = () => {
  const [position, setPosition] = useState<LatLng>();
  const map = useMapEvents({
    click(e: LeafletMouseEvent) {
      console.log(e);
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

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
