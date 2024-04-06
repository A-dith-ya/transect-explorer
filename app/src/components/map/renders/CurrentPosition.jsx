import { Marker } from 'react-leaflet';
import useTimeout from '../../../hooks/useTimeout';
import { CURRENT_POSITION_UPDATE } from '../../../state/actions';
import { useContext } from 'react';
import { MapContext } from '../../../contexts/MapContext';


const CurrentPosition = () => {
  const { state, dispatch } = useContext(MapContext)

  return (
    state.position_enabled && state.current_position && <Marker position={state.current_position} />
  )
}

export default CurrentPosition;
