import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/layout/navbar/NavBar'
import MapPage from './pages/Map/MapPage';
import GroupForm from './pages/Group/GroupForm';

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
