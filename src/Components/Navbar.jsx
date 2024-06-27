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
      <main>
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
      </main>
    </>
  );
};

export default Navbar;
