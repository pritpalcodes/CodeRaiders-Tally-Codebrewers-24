import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomeLandingPage from './Pages/HomeLandingPage'
import Login from './Pages/Login'

// import Login from './Pages/Login'
// import ProtectedRoute from './Pages/ProtectedRoute'
// import Question from './Pages/Question'
import ProtectedRoute from './Pages/ProtectedRoute'
import PageLoading from './Pages/PageLoading'
import Description from './Pages/Description'
import Practice from './Pages/Practice'
import Contest from './Pages/Contest'
import ContestDetails from './Pages/ContestDetails'

function App() {

  return (
      <BrowserRouter>
          <Routes>

            <Route path='/' index element={<HomeLandingPage/>} /> 
            <Route path='/login' element={<Login/>} />

            <Route path='/practice' element={<ProtectedRoute><Practice/></ProtectedRoute>} />
            <Route path='/practice/:id' element={<Description />} />
            <Route path='/page-loading' element={<PageLoading/>} />
            <Route path='/contest' element={<Contest/>} />
            <Route path='/contest/:code' element={<ContestDetails/>} />
            {/* <Route path='/signup' element={<Signup/>} /> */}
            {/* <Route path='/page-loading' element={<PageLoading/>} /> */}
          </Routes>
          
        </BrowserRouter>
  )
}

export default App
