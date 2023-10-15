import React from 'react'
import { Routes, Route } from 'react-router-dom'
import App from '../pages/App'
import Home from '../pages/Home'
import Login from '../components/auth/Login'
import Signup from '../components/auth/Signup'
import Account from '../pages/Account'

const Paths = () => {


  return (
    <Routes >
        <Route path="/" element={<Home />} />
        <Route path={`/app`} element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}

export default Paths