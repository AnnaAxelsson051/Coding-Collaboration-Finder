/*import logo from './logo.svg';*/
/*import './App.css';*/

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import OnBoarding from './pages/OnBoarding'

/*routing helps us route to pages*/
import {BrowserRouter, Routes, Route } from 'react-router-dom'

/*for visiting the different pages*/
const App = () =>{
  return (
    <BrowserRouter>
<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path= "/onboarding" element={<OnBoarding/>}/>
</Routes>
    </BrowserRouter>
  );
}

export default App;
