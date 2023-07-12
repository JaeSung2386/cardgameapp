import { React } from "react";
import { Routes, Route } from "react-router-dom";

import "./style.css";
import Home from "../../pages/home";
import BlackJack from "../../pages/blackjack";

function withPage(Page) {
  return (
    <div className="page-wrapper">
      <div className="page-container">
        <Page />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <main>
      <Routes>
        <Route exact path="/" element={withPage(Home)} />
        <Route path="/blackjack" element={withPage(BlackJack)} />
      </Routes>
    </main>
  );
}

export default AppRoutes;
