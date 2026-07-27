import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Index from "./pages";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/index" element={<Index></Index>}></Route>
      <Route path="*" element={<h1>Not Found</h1>}></Route>
    </Routes>
  );
}

export default App;
