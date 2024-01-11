import { Marker } from 'react-leaflet';
import marker from '../../../images/icons/rec.png'
import { Icon } from 'leaflet';
import { useContext } from 'react';
import { MapContext } from '../../../contexts/MapContext';

const ClickMarkers = () => {
  const { state, dispatch } = useContext(MapContext)
  const icon = new Icon({iconUrl: marker})

  return (0 < state.verticies.length && 
      state.verticies.map((verticy) => 
        <Marker icon={icon} position={{lat: verticy[1], lng: verticy[0]}} />
      )
  )
}

export default ClickMarkers
{/* <a href='https://www.flaticon.com/free-icons/dot' title='dot icons'>Dot icons created by iconixar - Flaticon</a> */}