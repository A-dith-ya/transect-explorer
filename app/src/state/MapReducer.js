import { map_modes, map_types } from '../constants/Map'
import {
  BUFFERED_EXTENTS_INITIALIZE,
  BUFFERED_EXTENTS_REMOVE_FURTHEST,
  BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS,
  CACHED_DATA_UPDATE,
  CURRENT_POSITION_UPDATE,
  DRAW_BOX,
  DRAW_POLY,
  FETCH_POSITION_START,
  FETCH_POSITION_STOP,
  MAIN,
  MEASURE_DISTANCE,
  NONE,
  PROOF,
  PUSH_POSITION,
  RECORD_POSITION_START,
  RECORD_POSITION_STOP,
  USER_BOUND_UPDATE_ON_MOVE,
  USER_BOUND_UPDATE_ON_ZOOM
} from './actions'

export const initialState = {
  map: map_types.main,
  mode: map_modes.none,
  fetch_position: false,
  geojson: null,
  fetch_geojson: null,
  current_position: null,
  verticies: [],
  user_bound: null,
  buffered_extents: {
    feature_collection: {
      type: 'FeatureCollection',
      features: []
    },
    initialized: false
  },
  cached_data: {
    type: 'FeatureCollection',
    features: []
  }
}

export default function MapReducer (state, action) {
  console.log(action.type, action.payload)
  switch (action.type) {
    case DRAW_BOX:
      return {
        ...state,
        mode: map_modes.box,
        geojson: null,
        verticies: []
      }
    case DRAW_POLY:
      return {
        ...state,
        mode: map_modes.polygon,
        geojson: null,
        verticies: []
      }
    case MEASURE_DISTANCE:
      return {
        ...state,
        mode: map_modes.distance,
        geojson: null,
        verticies: []
      }
    case NONE:
      return {
        ...state,
        mode: map_modes.none,
        geojson: action.payload.geojson,
        verticies: []
      }
    case PUSH_POSITION:
      return {
        ...state,
        verticies: action.payload.verticies
      }
    case MAIN:
      return {
        ...state,
        map: map_types.main
      }
    case PROOF:
      return {
        ...state,
        map: map_types.proof
      }
    case FETCH_POSITION_START:
      return {
        ...state,
        record_position: false,
        fetch_position: true
      }
    case FETCH_POSITION_STOP:
      return {
        ...state,
        fetch_position: false,
        current_position: null
      }
    case RECORD_POSITION_START:
      return {
        ...state,
        fetch_position: false,
        record_position: true,
        verticies: []
      }
    case RECORD_POSITION_STOP:
      return {
        ...state,
        record_position: false
      }
    case CURRENT_POSITION_UPDATE:
      return {
        ...state,
        current_position: action.payload.current_position
      }
    case USER_BOUND_UPDATE_ON_MOVE:
    case USER_BOUND_UPDATE_ON_ZOOM:
      return {
        ...state,
        user_bound: action.payload.geojson
      }
    case BUFFERED_EXTENTS_INITIALIZE:
      return {
        ...state,
        buffered_extents: {
          initialized: true,
          feature_collection: {
            ...state.buffered_extents.feature_collection,
            features: action.payload.features
          }
        },
        fetch_geojson: action.payload.fetch_geojson
      }
    case BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS:
    case BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS:
    case BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS:
    case BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS:
    case BUFFERED_EXTENTS_REMOVE_FURTHEST:
      return {
        ...state,
        buffered_extents: {
          ...state.buffered_extents,
          feature_collection: {
            ...state.buffered_extents.feature_collection,
            features: action.payload.features
          }
        },
        fetch_geojson: action.payload.fetch_geojson
      }
    case CACHED_DATA_UPDATE:
      return {
        ...state,
        cached_data: {
          ...state.cached_data,
          features: action.payload.features
        }
      }
    default:
      return state
  }
}
