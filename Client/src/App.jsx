import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'

import HomeLandingPage from './Pages/HomeLandingPage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'

// import Login from './Pages/Login'
// import ProtectedRoute from './Pages/ProtectedRoute'
// import Question from './Pages/Question'
import ProtectedRoute from './Pages/ProtectedRoute'
import PageLoading from './Pages/PageLoading'
import Description from './Pages/Description'
import Practice from './Pages/Practice'
import Contest from './Pages/Contest'
import ContestDetails from './Pages/ContestDetails'
import LeaderBoard from './Pages/LeaderBoard'
import Profile from './Pages/Profile'

function App() {

  return (
      <BrowserRouter>
          <Routes>

            <Route path='/' index element={<HomeLandingPage/>} /> 
            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />
            <Route path='/profile' element={<Profile/>} />

            <Route path='/practice' element={<ProtectedRoute><Practice/></ProtectedRoute>} />
            <Route path='/practice/:id' element={<Description />} />
            <Route path='/page-loading' element={<PageLoading/>} />
            <Route path='/contest' element={<Contest/>} />
            <Route path='/contest/:code' element={<LeaderBoard/>} />
            {/* <Route path='/signup' element={<Signup/>} /> */}
            {/* <Route path='/page-loading' element={<PageLoading/>} /> */}
            <Route path='/contest/:code/leaderboard' element={<LeaderBoard />} />
            <Route path='/contest/:code' element={<ContestDetails/>} />
          
          </Routes>
        </BrowserRouter>
  )
}

export default App
