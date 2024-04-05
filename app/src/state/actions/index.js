// Map Reducer Actions
export const DRAW_POLY = "DRAW_POLY";
export const MEASURE_DISTANCE = "MEASURE_DISTANCE";
export const NONE = "NONE";
export const EDIT_TRANSECT = "EDIT_TRANSECT";
export const EDIT_TRANSECT_NAME = "EDIT_TRANSECT_NAME";
export const EDIT_TRANSECT_OBSERVATION = "EDIT_TRANSECT_OBSERVATION";
export const EDIT_TRANSECT_REGION = "EDIT_TRANSECT_REGION";
export const EDIT_TRANSECT_GROUP = "EDIT_TRANSECT_GROUP";
export const ADD_COORDINATE = "ADD_COORDINATE";
export const CLEAR_COORDINATES = "CLEAR_COORDINATES";
export const UPDATE_COORDINATES = "UPDATE_COORDINATES";
export const REMOVE_COORDINATE = "REMOVE_COORDINATE";
export const PUSH_POSITION = "PUSH_POSITION";
export const CURRENT_POSITION_UPDATE = "CURRENT_POSITION_UPDATE";
export const UPDATE_GEOJSON = "UPDATE_GEOJSON";

// User Bound Actions
export const USER_BOUND_UPDATE_ON_ZOOM = "USER_BOUND_UPDATE_ON_ZOOM";
export const USER_BOUND_UPDATE_ON_MOVE = "USER_BOUND_UPDATE_ON_MOVE";

// Buffered Extents
export const BUFFERED_EXTENTS_INITIALIZE = "BUFFERED_EXTENTS_INITIALIZE";
export const BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS =
  "BUFFERED_EXTENTS_UPDATE_ON_NO_INTERSECTIONS";
export const BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS =
  "BUFFERED_EXTENTS_UPDATE_ON_ONE_INTERSECTIONS";
export const BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS =
  "BUFFERED_EXTENTS_UPDATE_ON_TWO_INTERSECTIONS";
export const BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS =
  "BUFFERED_EXTENTS_UPDATE_ON_THREE_INTERSECTIONS";
export const BUFFERED_EXTENTS_REMOVE_FURTHEST =
  "BUFFERED_EXTENTS_REMOVE_FURTHEST";
export const BUFFERED_EXTENTS_NO_UPDATE = "BUFFERED_EXTENTS_NO_UPDATE";

// Cached Data
export const CACHED_DATA_UPDATE = "CACHED_DATA_UPDATE";
