import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import DrawingBar from './components/map/DrawingBar'
import './App.css'
import NavBar from './components/layout/navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MapContainer
        id='map'
        center={[55, -122]}
        zoom={5}
        scrollWheelZoom={true}
        zoomControl={false}>

        <DrawingBar>
    

        </DrawingBar>

        <TileLayer

          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

      </MapContainer>
      <NavBar>
        
      </NavBar>
    </div>
  )
}

export default App
