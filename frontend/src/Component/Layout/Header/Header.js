import React, { Fragment } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from  "../../../Image/1bd28eff5f34458eafa047794776d642.png"
import logoimg from  "../../../Image/FullLogo_Transparent.png"
import './Header.css'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import { FaAmazon } from "react-icons/fa";
import { Link } from "react-router-dom";
import  {AiOutlineSearch} from 'react-icons/ai';
import { useSelector } from "react-redux";

const options = {
 
  burgerColor:"gray",
  burgerColorHover:"gray",
  logo,
  logoWidth: "15vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconUrl: "/login",

  // ProfileIconElement: profileIcon,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  // searchIcon:true,
  
  searchIconElement:{FaAmazon},

  searchIconColor: "black",
  
  CartIconElement:{AiOutlineShoppingCart},
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};

const Header = () => {
  const{isAuth} =useSelector((state)=>state.user);

  return(
  <>
  
  <div className="Header">
  <ReactNavbar {...options}/>
 
      <div className="left-navbar">
   
   <img src={logoimg} alt="img" ></img>

   </div>
   <div className="right-navbar">

      <Link to={"/search"}>
    <AiOutlineSearch style={{fontSize:"40",position:"absolute",top:"4.8",right:"130",color:"white"}} />
      
      </Link >
      <Link to={"/Cart"}>
       <AiOutlineShoppingCart style={{fontSize:"40",position:"absolute",top:"4.7",right:"90",color:"white"}} />
       </Link>
       
     {
       isAuth ?(<Fragment></Fragment>):( 
        <Link to={"/login"} >
        <button style={{marginTop:"20"}}>
        <span >Login</span>
      </button>
        </Link>
       
      )
     }

   </div>

   
   </div>
   </>
  
  )
};

export default Header;