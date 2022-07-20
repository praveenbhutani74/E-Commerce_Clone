import React, { Fragment, useState } from 'react'
import "./Header.css"
import SpeedDial from '@mui/material/SpeedDial';
import { useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import { Logout } from '../../../actions/UserAction';
import HomeIcon from '@mui/icons-material/Home';

const UserOption = ({user}) => {
  const [open,setOpen]=useState(false);
  const alert=useAlert();
  const dispatch=useDispatch();

  const navigate=useNavigate();
  const options=[
    {icon: <HomeIcon/> , name:"Home", func: Home},
    {  icon: <ListAltIcon/> , name:"Orders", func: orders },
    {  icon: <PersonIcon/> , name:"Profile", func: account },
    {  icon: <ExitToAppIcon/> , name:"Logout", func: LogoutUser },
    {  icon: <DashboardIcon/> , name:"Dashboard", func: dashboard }
  ]

  // if(user.role==="admin"){
  //   options.unshift(  )
  // }

  function dashboard(){
    navigate("/admin/dashboard");
  }
  function orders(){
    navigate("/orders");
  }
  function account(){
    navigate("/account");
  }
  function Home(){
    navigate("/");
  }
  function LogoutUser(){

   dispatch(Logout());
    alert.success("Logout")
  }
  
  
  return (
   <Fragment>
     <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
      ariaLabel='SpeedDial tooltip example'
      onClose={()=> setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={open}
      style={{ zIndex: "11" }}
      direction="down"
      className="speedDial"
     
      icon={
        <img 
        src={user.avatar.url}
        alt="profile"
       style={{height:"56px",width:"56px",borderRadius:"50%",marginLeft:"1px",marginBottom:"-13px"}}
        />
      }
      >
          
        { options.map((item)=>(
          <SpeedDialAction
          key={item.name}
          icon={item.icon} tooltipTitle={item.name} onClick={item.func} />
        ))}
      </SpeedDial>
   </Fragment>
  )
}

export default UserOption