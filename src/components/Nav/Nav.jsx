import React from "react";
import logo from "./../../assets/logo.png";
import "./Nav.css";

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <img className="flash-logo" src={logo} alt="logo" />
        <p className="flash-logo-text">FlashType</p>
      </div>
      <div className="nav-right">
        <a
          target="_blank"
          className="nav-git-link"
          href="https://github.com/Omii9600"
          rel="noreferrer"
        >
          Git
        </a>
      </div>
    </div>
  );
};

export default Nav;
