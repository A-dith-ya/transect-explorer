import { Marker } from 'react-leaflet';
import useTimeout from '../../../hooks/useTimeout';
import { CURRENT_POSITION_UPDATE } from '../../../state/actions';
import { useContext } from 'react';
import { MapContext } from '../../../contexts/MapContext';


const CurrentPosition = () => {
  const { state, dispatch } = useContext(MapContext)

  const { reset } = useTimeout(() => {
    if (state.fetch_position)
      navigator.geolocation.getCurrentPosition(function(position) {
        dispatch({type: CURRENT_POSITION_UPDATE, payload: {
          current_position: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
        }})
      });
    reset();
  }, 5000);

  return (
    state.current_position && <Marker position={state.current_position} />
  )
}

export default CurrentPosition;