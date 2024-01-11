import { useContext } from 'react'
import { GeoJSON, Pane } from 'react-leaflet'
import { MapContext } from '../../../contexts/MapContext'

export default function BufferedExtents() {
  const { state, dispatch } = useContext(MapContext)
  return (
    <Pane name='buffered-extents' style={{ zIndex: 2000 }}>
      <GeoJSON key={Math.random()} data={state.buffered_extents.feature_collection} />
    </Pane>
  )
}