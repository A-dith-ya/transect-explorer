import { GeoJSON } from 'react-leaflet'
import useTimeout from '../../../hooks/useTimeout'
import { toGeoJSON } from '../helpers/GeoJSON'
import { calculateHaverSine } from '../helpers/Calculate'
import { PUSH_POSITION } from '../../../state/actions'
import { useContext } from 'react'
import { MapContext } from '../../../contexts/MapContext'

const RecordedPath = () => {
  const { state, dispatch } = useContext(MapContext)

  const { reset } = useTimeout(() => {
    if (state.record_position) {
      navigator.geolocation.getCurrentPosition(function(position){
        const current = [position.coords.longitude, position.coords.latitude]
        const length = state.verticies.length

        if (1 < length) {
          const previous = state.verticies[length - 1]
          const result = calculateHaverSine(
            current[1],
            current[0],
            previous[1],
            previous[0]
          ) * 1000

          if (4 < result) {
            let newPositions = state.verticies
            newPositions.push(current)
            dispatch({type: PUSH_POSITION, payload: {
              verticies: newPositions
            }})
          }
        }
        if (0 === length) {
          let newPositions = state.verticies
          newPositions.push(current)
          dispatch({type: PUSH_POSITION, payload: {
            verticies: newPositions
          }})
        }
      })
    }
    reset()
  }, 5000)

  return (
    <>
      {1 < state.verticies && <GeoJSON data={toGeoJSON(state.verticies, 'LineString')} />}
    </>
  )
}

export default RecordedPath