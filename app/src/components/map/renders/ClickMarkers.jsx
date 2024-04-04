import { Marker, Popup } from 'react-leaflet';
import { useContext } from 'react';
import { MapContext } from '../../../contexts/MapContext';
import { calculateUTM } from '../helpers/Calculate';
import { REMOVE_COORDINATE } from '../../../state/actions/index';

const ClickMarkers = () => {
  const { state, dispatch } = useContext(MapContext);

  function handleClose(e,index) {
    setTimeout(() => {
      e.preventDefault();
      console.log('HERE', index);

      let coords = state.coordinates;
      coords.splice(index,1);

      dispatch({
        type: REMOVE_COORDINATE,
        payload: {
          coordinates: coords
        }
      });
    }, 250);
  }

  return (state.coordinates.length > 0 && 
    state.coordinates.map((item, index) => {
      const utm = calculateUTM({
        lat: item[1], lng: item[0]
      });
    
      return (
        <Marker
          key={`marker-${index}`}
          position={{lat: item[1], lng: item[0]}}>
          <Popup>
            <p>UTM Zone: {utm.zone}</p>  
            <p>Northing: {utm.northing}</p>  
            <p>Easting: {utm.easting}</p>  

            <button onClick={(e) => handleClose(e, index)}>
              Remove
            </button>
          </Popup>
        </Marker>
      );
    })
  )
}

export default ClickMarkers
{/* <a href='https://www.flaticon.com/free-icons/dot' title='dot icons'>Dot icons created by iconixar - Flaticon</a> */}
/*
 * */
