import {
  GeoJSON,
  TileLayer,
  useMapEvent,
  useMap,
  Pane
} from 'react-leaflet'
import DrawingBar from './DrawingBar'
import DrawBox from './buttons/DrawBox'
import DrawPoly from './buttons/DrawPoly'
import MeasureDistance from './buttons/MeasureDistance'
import ClickMarkers from './renders/ClickMarkers'
import CurrentPosition from './renders/CurrentPosition'
import RecordedPath from './renders/RecordedPath'
import save from '../../images/icons/diskette.png'
import { map_modes } from '../../constants/Map'
import { CACHED_DATA_UPDATE, USER_BOUND_UPDATE_ON_MOVE, USER_BOUND_UPDATE_ON_ZOOM } from '../../state/actions'
import { createUserGeo } from './helpers/GeoJSON'
import { initializeBuffers, moveCheck } from './helpers/Mapping'
import BufferedExtents from './renders/BufferedExtents'
import { useContext, useEffect, useState } from 'react'
import { MapContext } from '../../contexts/MapContext'
import { getGeoJSON } from './layers/DataBC'

export default function Main() {
  const { state, dispatch } = useContext(MapContext)
  const { buffered_extents, cached_data } = state
  const map = useMap()

  useMapEvent('zoomend', (_e) => {
    if (map.getZoom() > 9) {
      /* User Bound Actions */
      const userGeo = createUserGeo(map)
      dispatch({
        type: USER_BOUND_UPDATE_ON_ZOOM,
        payload: {
          geojson: userGeo,
        },
      })
      if (!buffered_extents.initialized) {
        const { type, features, fetch_geo } = initializeBuffers(userGeo.properties.center)
        dispatch({
          type: type,
          payload: {
            features: features,
            fetch_geojson: fetch_geo
          }
        })
      } else {
        const { type, features, fetch_geo } = moveCheck(userGeo, buffered_extents)
        dispatch({
          type: type,
          payload: {
            features: features,
            fetch_geojson: fetch_geo
          }
        })
      }
    }
  })

  useMapEvent('moveend', (_e) => {
    if (map.getZoom() > 9) {
      const userGeo = createUserGeo(map)
      dispatch({
        type: USER_BOUND_UPDATE_ON_MOVE,
        payload: {
          geojson: userGeo,
        },
      })

      try {
        const { type, features, fetch_geo } = moveCheck(userGeo, buffered_extents)
        dispatch({
          type: type,
          payload: {
            features: features,
            fetch_geojson: fetch_geo
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  })

  useEffect(() => {
    if (state.fetch_geojson) {
      setTimeout(() => {
        getGeoJSON(
          "WHSE_WATER_MANAGEMENT.WLS_WATER_RESERVES_POLY",
          state.fetch_geojson
        ).then((returnVal) => {
          const features = cached_data.features
          const fetchedFeatures = returnVal.features.map((feature) => {
            feature.properties.timestamp = state.fetch_geojson.properties.timestamp
            return feature;
          });
          const newFeatures = []

          buffered_extents.feature_collection.features.forEach((buffer) => {
            features.forEach((feature) => {
              if (feature.properties.timestamp === buffer.properties.timestamp)
                newFeatures.push(feature)
            })
          })

          dispatch({
            type: CACHED_DATA_UPDATE,
            payload: {
              features: [...newFeatures, ...fetchedFeatures]
            }
          })
        });
      }, 50);
    }
  }, [state.fetch_geojson]);

  return (
    <div>
      <DrawingBar>
        <DrawBox map={map} />
        <DrawPoly />
        <MeasureDistance />
        <button className='leaflet-control' id='leaflet-button' onClick={() => {
            map.setView(state.user_bound.properties.center, state.user_bound.properties.zoom)
          }}>
          <img src={save} alt='save icon' style={{height: 32, width: 32}} />
        </button>
      </DrawingBar>

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      {state.geojson && <GeoJSON data={state.geojson} />}
      {state.mode !== map_modes.none && <ClickMarkers />}

      <CurrentPosition />
      <RecordedPath />
      <Pane name='WHSE_WATER_MANAGEMENT.WLS_WATER_RESERVES_POLY' style={{zIndex: 2000}}>
        <GeoJSON key={Math.random()} data={cached_data} style={{color: 'purple'}} />
      </Pane>
    </div>
  )
}
{/* <a href='https://www.flaticon.com/free-icons/save' title='save icons'>Save icons created by Yogi Aprelliyanto - Flaticon</a> */}