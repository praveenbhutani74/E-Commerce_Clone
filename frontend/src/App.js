import "./App.css";
import Header from "./Component/Layout/Header/Header";
import Home from "./Component/Home/Home.js";
import Footer from "./Component/Layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import ProductDetails from "./Component/Product/ProductDetails";
import AllProducts from "./Component/Product/AllProducts";
import Search from "./Component/Product/Search";
import LoginSignUp from "./Component/Auth.js/LoginSignUp";
import SignUp from "./Component/Auth.js/SignUp";
import store from './store';
import { LoadingUser } from "./actions/UserAction";
import UserOption from "./Component/Layout/Header/UserOption";
import { useSelector } from "react-redux";
import UserProfile from "./Component/Auth.js/UserProfile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import UpdateProfile from "./Component/Auth.js/UpdateProfile";
import UpdatePassword from "./Component/Auth.js/UpdatePassword";
import ForgotPassword from "./Component/Auth.js/ForgotPassword";
import ResetPassword from "./Component/Auth.js/ResetPassword";
import CartItem from "./Component/Cart/CartItem";
import Shipping from "./Component/Cart/Shipping";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import axios from "axios";

import Payment from "./Component/Cart/Payment";
import ElementRoute from "./Component/Route/ElementRoute";
import Success from "./Component/Cart/Success";
import MyOrderDetail from "./Component/Order/MyOrderDetail";
import SingleOrderDetail from "./Component/Order/SingleOrderDetail";
import Dashboard from "@mui/icons-material/Dashboard";


// import Slider from './Component/Layout/Slider/Slider';

function App() {

  const {isAuth,user}=useSelector((state)=>state.user);
  const[stripeApiKey,setStripeApiKey]=useState("");



  async function getStripeApiKey(){
    const {data}=await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey)
  }


  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito", "Roboto"],
      },
    });
    store.dispatch(LoadingUser());

    getStripeApiKey();

  },[]);

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Router>
              {isAuth && <UserOption user={user}/>}
             
          <Header />
       
          <Routes>
          <Route element={<ElementRoute/>}> 
            { stripeApiKey&& <Route exact path="/process/payment" element={<Payment/>} />}
        </Route>
        
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<AllProducts />} />
            <Route path="/products/:keyword" element={<AllProducts />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/password/forgot" element={<ForgotPassword/>}/>
            <Route exact path="/Cart" element={<CartItem/>}/>
            <Route exact path="/password/reset/:token" element={<ResetPassword/>}/>
            <Route element={<ProtectedRoute />}>
              <Route exact path="/account" element={<UserProfile/> }/>

              <Route exact path="/me/update" element={<UpdateProfile/>}/>
              <Route exact path="/password/update" element={<UpdatePassword/>}/>
              <Route exact path="/shipping" element={<Shipping/>}/>
               <Route exact path="/order/confirm" element={<ConfirmOrder/>} />
               
                 
            <Route exact path="/success" element={<Success/>}/>     
            <Route exact path="/orders" element={<MyOrderDetail/>}/> 
            <Route exact path="/order/:id" element={<SingleOrderDetail/>}/>   
            <Route exact path="/admin/dashboard" element={<Dashboard />}/>       
            </Route>
          
           
          </Routes>
       
          <Footer />
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
