import ruler from '../../../images/icons/ruler.png'
import { useMapEvents } from 'react-leaflet'
import { geometry_types, map_modes } from '../../../constants/Map'
import { toGeoJSON } from '../helpers/GeoJSON'
import { MEASURE_DISTANCE, NONE, PUSH_POSITION } from '../../../state/actions'
import { useContext } from 'react'
import { MapContext } from '../../../contexts/MapContext'

export default function MeasureDistance() {
  const { state, dispatch } = useContext(MapContext)
  const { mode, verticies } = state

  useMapEvents({
    click(e) {
      if (map_modes.distance === mode) {
        let newVerticies = verticies
        newVerticies.push([e.latlng.lng, e.latlng.lat])
        dispatch({
          type: PUSH_POSITION, payload: {
            verticies: newVerticies
          }
        })
      }
    }
  })

  function handleClick() {
    if (map_modes.distance === mode) {
      if (verticies.length > 1) {
        dispatch({
          type: NONE, payload: {
            geojson: toGeoJSON(verticies, geometry_types.linestring)
          }
        })
      }
    } else dispatch({ type: MEASURE_DISTANCE })
  }

  return (
    <button
      className='leaflet-control'
      id='leaflet-button'
      onClick={handleClick}>
      <img style={{
        height: 40, width: 40
      }} src={ruler} sizes='16px' alt='Ruler icon' />
    </button>
  )
}
{/* <a href='https://www.flaticon.com/free-icons/ruler' title='ruler icons'>Ruler icons created by Indielogy - Flaticon</a> */ }