
import { useContext, useEffect } from 'react'
import { MapContext } from '../../../contexts/MapContext'
import { ENABLE_POSITION, DISABLE_POSITION, UPDATE_POSITION } from '../../../state/actions'

export default function MyPosition() {
  const { state, dispatch } = useContext(MapContext)

  useEffect(() => {
    if (state.position_enabled) {

      setTimeout(() => {
        navigator.geolocation.getCurrentPosition((position) => {

          dispatch({
            type: UPDATE_POSITION,
            payload: {
              position: {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              }
            }
          });

        });

      }, 2000);
    }
  }, [state]);

  function handleClick() {
    if (state.position_enabled)
    {
      dispatch({ type: DISABLE_POSITION });
    }
    else
    {
      dispatch({ type: ENABLE_POSITION })
    }
  }

  return (
    <button
        className='leaflet-control'
        id='leaflet-button'
        onClick={handleClick}>
      <i class="fa-solid fa-location-arrow" />
    </button>
  )
}
