import React, { Fragment } from 'react'

import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";


const ProtectedRoute = () => {
  const{isAuth,loading} =useSelector((state)=>state.user);
  return (
  
   loading===false&&isAuth===true?
   
   <Outlet/>
  
   
   :<Navigate to="/login"/>
   
  )
}

export default ProtectedRoute