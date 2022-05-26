import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './Slider.css';


import img from "../../../Image/lake.jpg";
import img2 from "../../../Image/Youtube_Banner_Size_34749296f8.png";

 
class Slider extends Component {
    render() {
        return (
            <div className='Main'>
            <Carousel className='Carousel-main' showThumbs={false} width="100%" showStatus={false} showArrows={false} 
            showIndicators={false}  autoPlay={true} infiniteLoop={true} 
            style={{ height: "500",position: "relative"}}
            >
                <div>
                    <img src={img} alt="image1"  />
                 
                </div>
                <div>
                    <img src={img2}  alt="image2"    />
                  
                </div>
                <div>
                    <img src={img2} alt="image3"  />
                  
                </div>
            </Carousel>
            </div>
        );
    }
}




export default Slider;