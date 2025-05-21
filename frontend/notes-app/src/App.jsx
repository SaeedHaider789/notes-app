import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'
import './App.css'

const routes = (
  <BrowserRouter>
    <Routes> {/* using slugs as userName*/}
      <Route path='/' element={<Navigate to={'/login'}/>}/>
      <Route path='/dashboard/:userName' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
    </Routes>
  </BrowserRouter>
)

const App = () => {
  return (
    <>{routes}</>
  )
}

export default App