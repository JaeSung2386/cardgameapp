import { React, useState, useEffect } from "react";
import {
  FaWordpress,
  FaGithubSquare
} from "react-icons/fa";

import {
  SiTistory
} from "react-icons/si";

import "./navbar.css";

function Navbar() {
  return (
    <header>
      <nav className="main-nav">
        {/* logo */}
        <div className="logo">
          <h2>
            <span>M</span>inigame
          </h2>
        </div>
        {/* menu */}
        <div className="menu-link">
          <ul>
            <li>
              <a href="#">BlackJack</a>
            </li>
            <li>
              <a href="#">MemoryGame</a>
            </li>
            <li>
              <a href="#">Wating...</a>
            </li>
            <li>
              <a href="#">Wating...</a>
            </li>
          </ul>
        </div>
        {/* social media */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="https://webveloper.dev/" target="_thapa">
                <FaWordpress className="wordpress" />
              </a>
            </li>
            <li>
              <a href="https://webveloper.dev/" target="_thapa">
                <SiTistory className="tistory" />
              </a>
            </li>
            <li>
              <a href="https://webveloper.dev/" target="_thapa">
                <FaGithubSquare className="github" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>);
}

export default Navbar;
