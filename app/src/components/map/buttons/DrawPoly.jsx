import poly from '../../../images/icons/polygon.png';
import { useEffect, useContext, useState } from 'react';
import { map_modes } from '../../../constants/Map'
import { useMapEvents } from 'react-leaflet';
import { toGeoJSON } from '../helpers/GeoJSON';
import { DRAW_POLY, NONE, ADD_COORDINATE } from '../../../state/actions';
import { MapContext } from '../../../contexts/MapContext';

export default function DrawPoly() {
  const { state, dispatch } = useContext(MapContext);
  const [draw, setDraw] = useState(false);
  const [coords, setCoords] = useState([]);
  const [geo, setGeo] = useState(null);

  useEffect(() => {
    console.log('GEO: ', geo);
  }, [geo]);

  useEffect(() => {
    console.log('Coordinates: ', coords);

    if (2 < coords.length)
    {
      setGeo({
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              ...coords,
              coords[0]
            ]
          ]
        },
        properties: {
          name: "Dinagat Islands"
        }
      });
    }

  }, [coords]);

  //  const { state, dispatch } = useContext(MapContext)
    /*  const {
    mode,
    verticies
  } = state*/

  useMapEvents({
    click(e) {
      if (state.mode === map_modes.polygon) {

        const newCoordinates = [...state.coordinates, e.latlng];

        dispatch({
          type: ADD_COORDINATE,
          payload: {
            coordinates: newCoordinates
          }
        });

      }
    }
  })

  function handleClick() {
    if (state.mode === map_modes.polygon) {
    //let geo = null
      //if (coordinates.length > 1)
      //geo = toGeoJSON(verticies, geometry_types.polygon)

      dispatch({
        type: NONE,
        payload: {
          geojson: null
        }
      })
    }
    else
    {
      dispatch({ type: DRAW_POLY })
    }

    setDraw(!draw);
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
