import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Page/Header";
import Footer from "./Page/Footer";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
