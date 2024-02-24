import { useState } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './pages/Map/MapPage';
import GroupForm from './pages/Group/GroupForm';
import NavBar from './components/layout/navbar/NavBar'
import DrawingBar from './components/map/DrawingBar'
import './App.css'
import NavBar from './components/layout/navbar/NavBar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MapPage/>} />
          <Route path="/group" element={<GroupForm/>}/>
        </Routes>
    </Router>
  )
}

export default App
