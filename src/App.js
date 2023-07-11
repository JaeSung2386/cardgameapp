import { React, useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar"
import BlackJack from "./component/BlackJack";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<BlackJack />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
