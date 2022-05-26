
import './App.css';
import Header from  "./Component/Layout/Header/Header";
import Home from './Component/Home/Home.js';
import Footer from './Component/Layout/Footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WebFont from "webfontloader";
import { useEffect } from 'react';
// import Slider from './Component/Layout/Slider/Slider';





function App() {
  useEffect(()=>{
    WebFont.load({
      google:{
        families:["Nunito","Roboto"]
      }
    })
  })
  
  return (     
    
    <Router>
    <Header/>


   <Routes>
   <Route path='/' element={<Home/>} />
   </Routes>

  
   
    <Footer/>
    </Router>
    
    
  );
}

export default App;
