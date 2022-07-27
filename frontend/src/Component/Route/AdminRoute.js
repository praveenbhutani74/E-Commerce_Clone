import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

const AdminRoute = ({isAdmin}) => {
  const{isAuth,loading,user} =useSelector((state)=>state.user);
  return (
    
   loading===false&&isAuth===true&&user.role==="admin"?
   
   <Outlet/>
  
   
   :<Navigate to="/login"/>
  )
}

export default AdminRoute