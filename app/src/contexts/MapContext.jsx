import {
  createContext,
  useMemo,
  useReducer
} from "react";
import MapReducer from "../state/MapReducer";
import { initialState } from "../state/MapReducer";

export default MapContextProvider
export {MapContext}

const MapContext = createContext({
  state: Object,
  dispatch: dispatchEvent
})

function MapContextProvider ({children}) {
  const [state, dispatch] = useReducer(MapReducer, initialState)

  return (
    <MapContext.Provider value={
      useMemo(() => (
        {state, dispatch}
      ), [state, dispatch])}>
      {children}
    </MapContext.Provider>
  )
}
