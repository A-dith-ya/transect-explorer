import box from '../../../images/icons/icons8-rectangle-48.png'
import { useContext, useEffect } from 'react'
import { MapContext } from '../../../contexts/MapContext'
import L from 'leaflet'
import { useMap, useMapEvent } from 'react-leaflet'
import 'leaflet-draw'
import { map_modes } from '../../../constants/Map'
import { DRAW_BOX, NONE } from '../../../state/actions'

export default function DrawBox({map}) {
    const { state, dispatch } = useContext(MapContext)
    const { mode } = state
    const draw = new L.Draw.Rectangle(map)

    useMapEvent('draw:created', (e) => {
        let geo = e.layer.toGeoJSON()
        dispatch({
            type: 'NONE', payload: {
                geojson: geo
            }
        })
        draw.disable()
    })

    function handleClick() {
        if (map_modes.box === mode) {
            dispatch({
                type: NONE, payload: {
                    geojson: null
                }
            })
            draw.disable()
        } else {
            dispatch({ type: DRAW_BOX })
            draw.enable()
        }
    }

    return (
        <button
            className='leaflet-control'
            id='leaflet-button'
            onClick={handleClick}>
            <img src={box} alt='Rectangle icon by Icon8' height={40} width={40} />
        </button>
    )
}
// <a target='_blank' href='https://icons8.com/icon/w4iOrXQ6LiS9/rectangle'>Rectangle</a> icon by <a target='_blank' href='https://icons8.com'>Icons8</a>