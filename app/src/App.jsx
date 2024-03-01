import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapPage from './pages/Map/MapPage';
import AddTransect from './pages/AddTransect/AddTransect';
import GroupForm from './pages/Group/GroupForm';
import NavBar from './components/layout/navbar/NavBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<MapPage/>} />
          <Route path="/group" element={<GroupForm/>}/>
          <Route path="/add" element={<AddTransect/>}/>
        </Routes>
    </Router>
  )
}

export default App
