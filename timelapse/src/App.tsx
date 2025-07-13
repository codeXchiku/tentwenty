import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import Login from './pages/authentication/Login'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MonthlyData from './pages/MonthlyData'
import WeekSheet from './pages/WeekSheet'
import Logout from './pages/authentication/Logout'

const App = () => {
  return (
   <BrowserRouter>
        <Routes>
          <Route element={<>
            <Navbar />
            <Outlet />
            <Footer />
          </>}>
            <Route path='/' element={<Login/>} />
            {/* <Route path='/register' element={<Register />} /> */}
            <Route path='/logout' element={<Logout />} />
            <Route path='/monthview' element={<MonthlyData/>} />
            <Route path='/currentweek' element={<WeekSheet/>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App