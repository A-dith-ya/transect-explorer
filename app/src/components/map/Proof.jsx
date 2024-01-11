import {
  GeoJSON,
  TileLayer,
  useMap
} from 'react-leaflet'
import UserBound from './renders/UserBound'
import { useContext, useEffect } from 'react'
import { map_types } from '../../constants/Map'
import BufferedExtents from './renders/BufferedExtents'
import { MapContext } from '../../contexts/MapContext'

export default function Proof() {
  const map = useMap()
  const { state, dispatch } = useContext(MapContext)

  useEffect(() => {
    if (map_types.proof === state.map)
      map.setView([55, -122], 5)
  }, [state.map, map])

  return (
    <div>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      <UserBound />
      <BufferedExtents />
      {state.geojson && <GeoJSON data={state.geojson} />}
    </div>
  )
}