import L from 'leaflet'
import React from 'react'
import { LayersControlProvider } from '../../contexts/layerControlContext'

export default function DrawingBar({ children }) {
  const divref = React.useRef()

  React.useEffect(() => {
    L.DomEvent.disableClickPropagation(divref.current)
    L.DomEvent.disableScrollPropagation(divref.current)
  }, [])

  return (
    <LayersControlProvider value={null}>
      <div
        ref={divref}
        className='leaflet-right leaflet-top leaflet-control'
        style={{ display: 'static' }}
      >
        {children}
      </div>
    </LayersControlProvider>
  )
}