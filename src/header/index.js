import React from "react";
import "./style.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import Logo from "./logo";
import SearchBar from "./searchbar";
import SocialMedia from "./socialmedia";

function Header() {
  return (
    <header>
      <nav className="main-nav">
        <Logo />
        <SearchBar />
        <SocialMedia />
      </nav>
    </header>
  );
}

export default Header;
