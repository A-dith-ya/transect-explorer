import { useEffect, useState } from 'react'
import marker from '../../../images/icons/maps-and-flags.png'
//import { FETCH_POSITION_START, FETCH_POSITION_STOP } from '../../../state/actions'
//import { MapContext } from '../../../contexts/MapContext'

function FetchPosition() {
  const [position, setPosition] = useState(null);
  //const { state, dispatch } = useContext(MapContext)
  
  useEffect(() => {
    console.log('POSITION', position);
  }, [position]);

  function handleClick() {
    //if (state.fetch_position) dispatch({ type: FETCH_POSITION_STOP })
    //else dispatch({ type: FETCH_POSITION_START })
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
      });
    }

  }

  return (
    <button
      className='leaflet-control'
      id='leaflet-button'
      onClick={handleClick}>
      <img src={marker} style={{ height: 32, width: 32 }} />
    </button>
  )
}

export default FetchPosition
{/* <a href='https://www.flaticon.com/free-icons/pin' title='pin icons'>Pin icons created by Freepik - Flaticon</a> */ }
