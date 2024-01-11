import poly from '../../../images/icons/polygon.png'
import { useContext } from 'react'
import { MapContext } from '../../../contexts/MapContext'
import { geometry_types, map_modes } from '../../../constants/Map'
import { useMapEvents } from 'react-leaflet'
import { toGeoJSON } from '../helpers/GeoJSON'
import { DRAW_POLY, NONE, PUSH_POSITION } from '../../../state/actions'

export default function DrawPoly() {
  const { state, dispatch } = useContext(MapContext)
  const {
    mode,
    verticies
  } = state

  useMapEvents({
    click(e) {
      if (map_modes.polygon === mode) {
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
    if (map_modes.polygon === mode) {
      let geo = null
      if (verticies.length > 1)
        geo = toGeoJSON(verticies, geometry_types.polygon)

      dispatch({
        type: NONE,
        payload: {
          geojson: geo
        }
      })
    } else {
      dispatch({ type: DRAW_POLY })
    }
  }

  return (
    <button
      className='leaflet-control'
      id='leaflet-button'
      onClick={handleClick}>
      <img src={poly} alt='Polygon icon' />
    </button>
  )
}
{/* <a href='https://www.flaticon.com/free-icons/polygonal' title='polygonal icons'>Polygonal icons created by Voysla - Flaticon</a> */ }