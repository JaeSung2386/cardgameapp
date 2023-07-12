import { React } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../../pages/home";
import BlackJack from "../../pages/blackjack";

function withPage(Page) {
  return (
    <div>
      <Page />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route exact path="/" element={withPage(Home)} />
      <Route path="/blackjack" element={withPage(BlackJack)} />
    </Routes>
  );
}

export default AppRoutes;
