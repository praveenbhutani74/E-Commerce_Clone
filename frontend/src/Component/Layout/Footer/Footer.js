import React from "react";
import playStore from "../../../Image/playstore.png";
import appStore from "../../../Image/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>SHOPPINGSTOCK.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2022 &copy; PraveenBhutani</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/praveenbhutaniiii/?hl=en">Instagram</a>
      
        <a href="https://www.linkedin.com/in/praveen-bhutani-564815190/">LinkedIn</a>
      </div>
    </footer>
  );
};

export default Footer;