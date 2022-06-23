import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IsAuth from './Auth'

const Private = () => {
    const IsAuth = IsAuth()
  return (
    <BrowserRouter>
    <Routes>
        <Route>


        </Route>
    </Routes>
   </BrowserRouter>
  )
}

export default Private
