import { map_modes } from "../constants/Map";
import {
  BUFFERED_EXTENTS_INITIALIZE,
  BUFFERED_EXTENTS_REMOVE_FURTHEST,
  BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS,
  BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS,
  USER_BOUND_UPDATE_ON_MOVE,
  USER_BOUND_UPDATE_ON_ZOOM,
  CACHED_DATA_UPDATE,
  DRAW_POLY,
  ADD_COORDINATE,
  CLEAR_COORDINATES,
  UPDATE_COORDINATES,
  REMOVE_COORDINATE,
  MEASURE_DISTANCE,
  CREATE_TRANSECT,
  NONE,
  DETAILS_PAGE_GEO,
  EDIT_TRANSECT,
  ENABLE_POSITION,
  DISABLE_POSITION,
  UPDATE_POSITION,
  EDIT_TRANSECT_NAME,
  EDIT_TRANSECT_OBSERVATION,
  EDIT_TRANSECT_REGION,
  EDIT_TRANSECT_GROUP
} from "./actions";

export const initialState = {
  mode: NONE,
  position_enabled: false,
  geojson: null,
  fetch_geojson: null,
  current_position: null,
  coordinates: [],
  form: {
    transectName: "",
    observation: "",
    region: "",
    group: "",
  },
  user_bound: null,
  buffered_extents: {
    feature_collection: {
      type: "FeatureCollection",
      features: [],
    },
    initialized: false,
  },
  cached_data: {
    type: "FeatureCollection",
    features: [],
  },
};

export default function MapReducer(state, action) {
  console.log("ACTION DISPATCH:", action.type, action.payload);
  switch (action.type) {
    case DRAW_POLY:
      if (state.coordinates.length > 3) {
        let len = state.coordinates.length;
        const newCoordinates = state.coordinates.slice(0, len - 1);
        return {
          ...state,
          mode: map_modes.polygon,
          geojson: null,
          coordinates: newCoordinates,
        };
      }

      return {
        ...state,
        mode: map_modes.polygon,
        geojson: null,
        coordinates: [],
      };

    case CREATE_TRANSECT:
      return {
        ...state,
        mode: map_modes.none,
        geojson: null,
        coordinates: []
      };

    case MEASURE_DISTANCE:
      return {
        ...state,
        mode: map_modes.distance,
        geojson: null,
      };

    case NONE:
      return {
        ...state,
        mode: map_modes.none,
        geojson: action.payload.geojson,
      };

    case ADD_COORDINATE:
    case UPDATE_COORDINATES:
    case REMOVE_COORDINATE:
      return {
        ...state,
        coordinates: action.payload.coordinates,
      };

    case CLEAR_COORDINATES:
      return {
        ...state,
        mode: NONE,
        coordinates: [],
      };

    case DETAILS_PAGE_GEO:
      return {
        ...state,
        geojson: action.payload.geojson
      };

    case ENABLE_POSITION:
      return {
        ...state,
        position_enabled: true
      };

    case DISABLE_POSITION:
      return {
        ...state,
        position_enabled: false
      };

    case UPDATE_POSITION:
      return {
        ...state,
        current_position: action.payload.position
      }

    case USER_BOUND_UPDATE_ON_MOVE:
    case USER_BOUND_UPDATE_ON_ZOOM:
      return {
        ...state,
        user_bound: action.payload.geojson,
      };

    case BUFFERED_EXTENTS_INITIALIZE:
      return {
        ...state,
        buffered_extents: {
          initialized: true,
          feature_collection: {
            ...state.buffered_extents.feature_collection,
            features: action.payload.features,
          },
        },
        fetch_geojson: action.payload.fetch_geojson,
      };

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
            features: action.payload.features,
          },
        },
        fetch_geojson: action.payload.fetch_geojson,
      };

    case CACHED_DATA_UPDATE:
      return {
        ...state,
        cached_data: {
          ...state.cached_data,
          features: action.payload.features,
        },
      };

    case EDIT_TRANSECT:
      let len = action.payload.coordinates.length;
      const coords = action.payload.coordinates.splice(len - 1, 1);
      return {
        ...state,
        mode: map_modes.polygon,
        geojson: null,
        coordinates: action.payload.coordinates,
      };

    case EDIT_TRANSECT_NAME:
      let transectName = action.payload.transectName;
      return {
        ...state,
        form: {
          ...state.form,
          transectName: transectName,
        },
      };

    case EDIT_TRANSECT_OBSERVATION:
      let transectObservation = action.payload.transectObservation;
      console.log("Setting state: " + transectObservation);
      return {
        ...state,
        form: {
          ...state.form,
          observation: transectObservation,
        },
      };

    case EDIT_TRANSECT_REGION:
      let transectRegion = action.payload.transectRegion;
      console.log("Setting region: " + transectRegion);
      return {
        ...state,
        form: {
          ...state.form,
          region: transectRegion,
        },
      };

    case EDIT_TRANSECT_GROUP:
      let transectGroup = action.payload.transectGroup;
      console.log("Setting group: " + transectGroup);
      return {
        ...state,
        form: {
          ...state.form,
          group: transectGroup,
        },
      };

    default:
      return state;
  }
}
