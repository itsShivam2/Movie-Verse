import React, { useEffect, useState } from "react";
import Home from "./pages/home/Home";
import Genre from "./pages/genre/Genre";
import Favourites from "./pages/favourites/Favourites";
import MovieDetails from "./pages/movieDetails/MovieDetails";
import TVShowDetails from "./pages/tvShowDetails/TvShowDetails";
import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <div className="bg-[#04152D]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genre" element={<Genre />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/movie/:movieId" element={<MovieDetails />} />
            <Route path="/tv/:tvShowId" element={<TVShowDetails />} />
          </Routes>
      </div>
    </>
  );
};

export default App;
