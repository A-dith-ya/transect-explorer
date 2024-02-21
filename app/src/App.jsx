import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DrawingBar from './components/map/DrawingBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MapContainer
        id='map'
        center={[55, -122]}
        zoom={5}
        scrollWheelZoom={false}
        zoomControl={false}>

        <DrawingBar>

        </DrawingBar>

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      </MapContainer>
    </div>
  )
}

export default App
