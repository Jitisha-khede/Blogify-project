"use client";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import { GettingStarted } from './components/ui/getting-started-page';
import { NavBar } from './components/ui/navbar';

function App() {

  return(
    <>
    <NavBar/>
    <Router>
      <Routes>
        <Route path="/" element={<GettingStarted />} />
        {/* <Route path="/home" element={<Home />} /> */}
      </Routes>
    </Router>
    </>
  )
}

export default App