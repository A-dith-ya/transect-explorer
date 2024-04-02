import { Marker } from 'react-leaflet';
import marker from '../../../images/icons/rec.png'
import { Icon } from 'leaflet';
import { useContext } from 'react';
import { MapContext } from '../../../contexts/MapContext';

const ClickMarkers = () => {
  const { state } = useContext(MapContext);
  const icon = new Icon({iconUrl: marker});

  return (state.coordinates.length > 0 && 
      state.coordinates.map((item) => 
        <Marker icon={icon} position={{lat: item.lat, lng: item.lng}} />
      )
  )
}

export default ClickMarkers
{/* <a href='https://www.flaticon.com/free-icons/dot' title='dot icons'>Dot icons created by iconixar - Flaticon</a> */}
