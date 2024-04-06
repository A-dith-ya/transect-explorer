import { useContext } from 'react';
import {
  ADD_COORDINATE,
  CLEAR_COORDINATES
} from '../../../state/actions'
import { MapContext } from '../../../contexts/MapContext';
import iconMarker from '../../../images/icons/maps-and-flags.png';
import marker from '../../../images/icons/rec.png';
import { toast } from "react-toastify";

function FetchPosition() {
  const { state, dispatch } = useContext(MapContext);

  function handleClick() {
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition((position) => {

        if (state.coordinates.length < 10) {
          dispatch({
            type: ADD_COORDINATE,
            payload: {
              coordinates: [...state.coordinates, [
                position.coords.longitude,
                position.coords.latitude
              ]]
            }
          });
        }
        else 
        {
          toast.error("Can\'t add more than 10 coordinates onto the map.");
        }

      });

    }

  }

  function handleClear() {
    dispatch({
      type: CLEAR_COORDINATES
    });
  }

  return (
    <>
      <button
        className='leaflet-control'
        id='leaflet-button'
        onClick={handleClick}>
        <img src={iconMarker} style={{ height: 32, width: 32 }} />
      </button>

      {state.coordinates.length > 0 && 
        <button
          className='leaflet-control'
          id='leaflet-button'
          onClick={handleClear}>
          <i className='fa-solid fa-x' />
        </button>
      }
    </>
  )
}

export default FetchPosition
{/* <a href='https://www.flaticon.com/free-icons/pin' title='pin icons'>Pin icons created by Freepik - Flaticon</a> */ }
