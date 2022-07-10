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
// import Slider from './Component/Layout/Slider/Slider';

function App() {
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
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<AllProducts />} />
            <Route path="/products/:keyword" element={<AllProducts />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route exact path="/signup" element={<SignUp />} />
          </Routes>

          <Footer />
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
