import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import DrawingBar from '../../components/map/DrawingBar'
import '../../App.css'

function MapPage() {
  return (
    <MapContainer
      id='map'
      center={[55, -122]}
      zoom={5}
      scrollWheelZoom={true}
      zoomControl={false}>

      <DrawingBar />

      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

    </MapContainer>
  );
}

export default MapPage;
