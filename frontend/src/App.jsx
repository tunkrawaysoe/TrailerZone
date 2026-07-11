import { useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails/MovieDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
  );
}

export default App;
