import React, { useEffect, useState } from "react";
import {
  getTopRatedMovies,
  getPopularMovies,
  searchAll,
} from "../../apis/movieApi";
import { getPopularTVShows, getTopRatedTVShows } from "../../apis/tvShowApi";
import MovieList from "../../components/movieList/MovieList";

function Home() {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedTVShows, setTopRatedTVShows] = useState([]);
  const [popularTVShows, setPopularTVShows] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchMoviesAndShows = async () => {
      const storedTopRatedMovies = localStorage.getItem("topRatedMovies");
      const storedPopularMovies = localStorage.getItem("popularMovies");
      const storedTopRatedTVShows = localStorage.getItem("topRatedTVShows");
      const storedPopularTVShows = localStorage.getItem("popularTVShows");

      if (storedTopRatedMovies) {
        setTopRatedMovies(JSON.parse(storedTopRatedMovies));
      } else {
        const topRatedMovies = await getTopRatedMovies();
        setTopRatedMovies(topRatedMovies);
        localStorage.setItem("topRatedMovies", JSON.stringify(topRatedMovies));
      }

      if (storedPopularMovies) {
        setPopularMovies(JSON.parse(storedPopularMovies));
      } else {
        const popularMovies = await getPopularMovies();
        setPopularMovies(popularMovies);
        localStorage.setItem("popularMovies", JSON.stringify(popularMovies));
      }

      if (storedTopRatedTVShows) {
        setTopRatedTVShows(JSON.parse(storedTopRatedTVShows));
      } else {
        const topRatedTVShows = await getTopRatedTVShows();
        setTopRatedTVShows(topRatedTVShows);
        localStorage.setItem(
          "topRatedTVShows",
          JSON.stringify(topRatedTVShows)
        );
      }

      if (storedPopularTVShows) {
        setPopularTVShows(JSON.parse(storedPopularTVShows));
      } else {
        const popularTVShows = await getPopularTVShows();
        setPopularTVShows(popularTVShows);
        localStorage.setItem("popularTVShows", JSON.stringify(popularTVShows));
      }
    };

    fetchMoviesAndShows();
  }, []);

  const handleSearch = async () => {
    if (query.trim() !== "") {
      try {
        setLoading(true);
        const searchResults = await searchAll(query);
        setSearchResults(searchResults);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="w-full bg-gray-900 text-white py-6 px-auto">
      <section className="mb-6">
        <div className="text-center">
          <h1 className="text-6xl font-bold my-4">WELCOME</h1>
          <p className="text-lg font-semibold">
            Explore the Ultimate Entertainment Universe: Discover Movies and TV
            Shows with MovieVerse!
          </p>
        </div>
        <div className="w-full flex justify-center items-center my-10">
          <input
            className="w-3/6 p-4 rounded-l-lg text-black"
            type="text"
            name="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Movies & TV Shows"
          />
          <button
            onClick={handleSearch} 
            className="w-1/6 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg text-white font-bold p-4 rounded-r-lg"
          >
            Search
          </button>
        </div>
      </section>

      <div>
        <div className="w-full flex justify-end items-center mr-8 px-3">
          <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Movies
          </button>
          <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            TV Shows
          </button>
        </div>
        <div>
          {searchResults.length > 0 ? (
            <div>
              <h1 className="text-2xl font-bold py-1 mb-6 font-sans">
                Search Results
              </h1>
              <MovieList movies={searchResults} />
            </div>
          ) : (
            <div>
              <div>
                <h1 className="text-2xl font-bold py-1 mb-6 font-sans">
                  Top Rated Movies
                </h1>
                <MovieList movies={topRatedMovies} />
              </div>
              <div>
                <h1 className="text-2xl font-bold py-1 mb-6 font-sans">
                  Popular Movies
                </h1>
                <MovieList movies={popularMovies} />
              </div>
              <div>
                <h1 className="text-2xl font-bold py-1 mb-6 font-sans">
                  Top Rated TV Shows
                </h1>
                <MovieList movies={topRatedTVShows} />
              </div>
              <div>
                <h1 className="text-2xl font-bold py-1 mb-6 font-sans">
                  Popular TV Shows
                </h1>
                <MovieList movies={popularTVShows} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
