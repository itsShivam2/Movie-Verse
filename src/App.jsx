import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Genre from "./pages/genre/Genre";
import Favourites from "./pages/favourites/Favourites";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre" element={<Genre />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/:movieId" element={<MovieDetails />} />
      </Routes>
    </>
  );
};

export default App;
