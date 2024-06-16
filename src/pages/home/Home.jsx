import React, { useEffect, useState } from "react";
import { getTopRatedMovies, getPopularMovies } from "../../apis/movieApi";
import MovieList from "../../components/movieList/MovieList";

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const topRated = await getTopRatedMovies();
      const popular = await getPopularMovies();
      setTopRatedMovies(topRated);
      setPopularMovies(popular);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Top Rated Movies</h1>
      <MovieList movies={topRatedMovies} />
      <h1>Popular Movies</h1>
      <MovieList movies={popularMovies} />
    </div>
  );
}

export default Home;
