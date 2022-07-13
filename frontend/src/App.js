import "./App.css";
import Header from "./Component/Layout/Header/Header";
import Home from "./Component/Home/Home.js";
import Footer from "./Component/Layout/Footer/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect } from "react";
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

// import Slider from './Component/Layout/Slider/Slider';

function App() {

  const {isAuth,user}=useSelector((state)=>state.user);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Nunito", "Roboto"],
      },
    });
    store.dispatch(LoadingUser());
  },[]);

  return (
    <>
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Router>
              {isAuth && <UserOption user={user}/>}
          <Header />
       
          <Routes>
        
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<AllProducts />} />
            <Route path="/products/:keyword" element={<AllProducts />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route exact path="/signup" element={<SignUp />} />
           
            <Route element={<ProtectedRoute/>}>
              <Route exact path="/account" element={<UserProfile/> }/>

              <Route exact path="/me/update" element={<UpdateProfile/>}/>
              <Route exact path="/password/update" element={<UpdatePassword/>}/>

            </Route>
           
          </Routes>
       
          <Footer />
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
