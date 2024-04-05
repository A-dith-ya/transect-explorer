import poly from '../../../images/icons/polygon.png';
import { useEffect, useContext, useState } from 'react';
import { map_modes } from '../../../constants/Map'
import { useMapEvents } from 'react-leaflet';
import { toGeoJSON } from '../helpers/GeoJSON';
import { DRAW_POLY, NONE, ADD_COORDINATE } from '../../../state/actions';
import { MapContext } from '../../../contexts/MapContext';
import { toast } from "react-toastify";

export default function DrawPoly() {
  const { state, dispatch } = useContext(MapContext);
  const [coords, setCoords] = useState([]);
  const [geo, setGeo] = useState(null);

  useMapEvents({
    click(e) {
      console.log(e);
      if (state.mode === map_modes.polygon) {

        if (state.coordinates.length < 10) {
          const newCoordinates = [...state.coordinates, [e.latlng.lng, e.latlng.lat]];

          dispatch({
            type: ADD_COORDINATE,
            payload: {
              coordinates: newCoordinates
            }
          });
        }
        if (state.coordinates.length > 9) {
          toast.error("Can\'t add more than 10 coordinates onto the map.");
        }

      }
    }
  })

  function handleClick() {
    if (state.mode === map_modes.polygon) {
      let geo = null
      if (state.coordinates.length > 2) {
        console.log(state.coordinates);
        geo = toGeoJSON(state.coordinates, 'Polygon');
      }
      else
      {
        toast.error("Need at least 3 coordinates to create a geometry");
      }

      dispatch({
        type: NONE,
        payload: {
          geojson: geo
        }
      });
    }
    else
    {
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
