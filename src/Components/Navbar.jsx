import { useState } from "react";

import "./Navbar.css";
import Logo from "../assets/DLF_logo.svg";
import BotIcon from "../assets/Bot_Icon-removebg-preview (1).png";
import HomeBg from "../assets/pexels-pixabay-290595.jpg";
import Chatbot from "./Chatbot";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeChatbotPopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div>
        <div className="navbar">
          <div className="navbar-left">
            <img className="logo" src={Logo} alt="" />
          </div>
          <div className="navbar-right">
            <a href="/">Home</a>
            <a href="#">About</a>
            <a href="#">Contact Us</a>
            <a href="#">Logout</a>
          </div>
        </div>
      </div>
      <div>
        <div className="homeBg">
          <img src={HomeBg} alt="" />
        </div>

        <div className="botIconDiv">
          <img
            className="shake"
            src={BotIcon}
            alt=""
            onClick={closeChatbotPopup}
          />
        </div>
        {isOpen && <Chatbot closeChatbotPopup={closeChatbotPopup} />}
      </div>
      <footer>
        <div className="footer-center">
          <div className="footer-content">
            This site is developed by
            <a href="https://www.navriksoftware.com/">
              Navrik Software Solutions
            </a>
            . All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
