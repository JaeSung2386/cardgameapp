import React from "react";
import "./style.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Logo from "./logo";
import SocialMedia from "./socialmedia";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Logo />
        {/* menu */}
        <div className="search-bar">
          <ReactSearchAutocomplete />
        </div>
        {/* social media */}
        <SocialMedia />
      </nav>
    </header>
  );
}

export default Header;
