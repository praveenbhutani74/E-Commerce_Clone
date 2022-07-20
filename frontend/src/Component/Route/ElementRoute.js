import React, { useEffect,useState } from 'react'
import { Elements } from '@stripe/react-stripe-js';
import { Outlet,Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import {loadStripe} from "@stripe/stripe-js";
import axios from 'axios';


const ElementRoute =() => { 
  const[stripeApiKey,setStripeApiKey]=useState("");
  const{isAuth} =useSelector((state)=>state.user);
  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)
  }
  useEffect(()=>{
    getStripeApiKey();
  },[])
  
  return (
  
    isAuth===true ? 
    <Elements stripe={loadStripe(stripeApiKey)} >
    <Outlet/>
    </Elements>
    
    : <Navigate to="/login"/>


  )
}

export default ElementRoute