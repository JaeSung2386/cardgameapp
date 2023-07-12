import React from "react";
import "./style.css";
import { SiWordpress, SiTistory, SiGithub } from "react-icons/si";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        {/* logo */}
        <div className="logo">
          <h2>
            <span>W</span>eb
            <span>G</span>ame
          </h2>
        </div>
        {/* menu */}
        <div className="search-bar">
          <ReactSearchAutocomplete />
        </div>
        {/* social media */}
        <div className="social-media">
          <ul className="social-media-desktop">
            <li>
              <a href="https://webveloper.dev/" target="_thapa">
                <SiWordpress />
              </a>
            </li>
            <li>
              <a href="https://webveloper.dev/" target="_thapa">
                <SiTistory />
              </a>
            </li>
            <li>
              <a href="https://webveloper.dev/" target="_thapa">
                <SiGithub />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
