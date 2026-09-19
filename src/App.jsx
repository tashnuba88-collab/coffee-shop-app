import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import CoffeeDetail from "./pages/CoffeeDetail";
import AdminPortal from "./pages/AdminPortal";
import Chatbot from "./components/Chatbot"; // <-- 1. Import Chatbot

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:id" element={<CoffeeDetail />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="/ai" element={<Chatbot />} /> {/* <-- 2. Add Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
