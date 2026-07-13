import { useState } from "react";
import Home from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Movies from "./pages/Movies/Movies";
import Actor from "./pages/Actor/Actor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/actors/:id" element={<Actor />} />
    </Routes>
  );
}

export default App;
