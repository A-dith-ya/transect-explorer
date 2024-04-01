import poly from '../../../images/icons/polygon.png'
import { useEffect, useState } from 'react'
//import { MapContext } from '../../../contexts/MapContext'
//import { geometry_types, map_modes } from '../../../constants/Map'
import { useMapEvents } from 'react-leaflet'
import { toGeoJSON } from '../helpers/GeoJSON'
//import { DRAW_POLY, NONE, PUSH_POSITION } from '../../../state/actions'

export default function DrawPoly() {
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
      //      if (map_modes.polygon === mode) {
      //  let newVerticies = verticies
      //  newVerticies.push([e.latlng.lng, e.latlng.lat])
      //  dispatch({
      //    type: PUSH_POSITION, payload: {
      //      verticies: newVerticies
      //    }
      //  })
      if (draw) {
        const coordinate = e.latlng

        setCoords([
          ...coords,
          [coordinate.lng, coordinate.lat]
        ]);

      }
    }
  })

  function handleClick() {
    /*if (map_modes.polygon === mode) {
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
    }*/
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
