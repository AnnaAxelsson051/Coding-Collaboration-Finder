/*import logo from './logo.svg';*/
/*import './App.css';*/

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'
import {useCookies} from "react-cookie"

/*routing helps us route to pages*/
import {BrowserRouter, Routes, Route } from 'react-router-dom'

/*for visiting the different pages*/
const App = () =>{
const [ cookies, setCookie, removeCookie ] = useCookies (['user'])

    const authToken = cookies.AuthToken

  return (
    <BrowserRouter>
<Routes>
    <Route path="/" element={<Home/>}/>
    {authToken && <Route path="/dashboard" element={<Dashboard/>}/>}
    {authToken && <Route path= "/onboarding" element={<OnBoarding/>}/>}
</Routes>
    </BrowserRouter>
  )
}

export default App;
