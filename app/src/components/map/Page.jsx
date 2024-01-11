import {
  MapContainer,
} from 'react-leaflet'
import Main from './Main'
import Proof from './Proof'

export default function Page () {

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      flexFlow: 'nowrap',
    }}>
      <MapContainer
        id='map'
        center={[55, -122]}
        zoom={5}
        scrollWheelZoom={false}
        zoomControl={false}>
        <Proof />
      </MapContainer>
      <MapContainer
        id='map'
        center={[55, -122]}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={true}>
        <Main />
      </MapContainer>
    </div>
  )
}