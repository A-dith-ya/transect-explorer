import { useContext } from 'react';
import { GeoJSON, Pane } from 'react-leaflet';
import { MapContext } from '../../../contexts/MapContext';

export default function UserBound() {
  const { state, dispatch } = useContext(MapContext)

  return (
    <Pane>
      {state.user_bound && <GeoJSON data={state.user_bound} style={{color: 'red'}} />}
    </Pane>
  )
}