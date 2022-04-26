import React from "react";
import Authentication from "./screens/authentication/authentication";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/home/Home";
import Errorpage from "./screens/errorPage/Errorpage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Authentication />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
