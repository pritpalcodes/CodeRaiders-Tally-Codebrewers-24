import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Practice from './Components/Practice.jsx'
import Home from './Home.jsx'

function App() {

  return (
    <Router>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/practice" element={<Practice />} />
    </Routes>
    </Router>
  )
}

export default App
