import React, { useEffect, useState } from "react";
import {
  getTopRatedMovies,
  getPopularMovies,
  searchAll,
} from "../../apis/movieApi";
import { getPopularTVShows, getTopRatedTVShows } from "../../apis/tvShowApi";
import List from "../../components/list/List";
import Layout from "../../components/layout/Layout";
import Spinner from "../../components/spinner/Spinner";
import SearchResults from "../../components/searchResults/SearchResults";
import Ocean from "../../../public/Ocean.mp4";
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

      // const topRatedMovies = await getTopRatedMovies();
      // setTopRatedMovies(topRatedMovies);
      // const popularMovies = await getPopularMovies();
      // setPopularMovies(popularMovies);
      // const topRatedTVShows = await getTopRatedTVShows();
      // setTopRatedTVShows(topRatedTVShows);
      // const popularTVShows = await getPopularTVShows();
      // setPopularTVShows(popularTVShows);

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
        console.log("searchResults", searchResults);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  // const image = `https://image.tmdb.org/t/p/w500${
  //   topRatedMovies[Math.floor(Math.random() * topRatedMovies.length)]
  //     .poster_path
  // }`;
  return (
    <Layout>
      <div className="w-full bg-[#04152D] text-white px-auto">
        <section className="relative">
          <video
            src={Ocean}
            autoPlay
            loop
            className="absolute w-full h-[400px] object-cover object-center opacity-30 bg-no-repeat"
          />

          <div className="absolute w-full h-[400px] bg-[#8a9fac] mix-blend-overlay"></div>

          <div className="relative text-center pt-16 mt-[70px] z-100">
            <h1 className="text-5xl sm:text-7xl font-bold p-2">WELCOME</h1>
            <p className="text-base md:text-xl font-semibold p-2">
              Explore the Ultimate Entertainment Universe: Discover Movies and
              TV Shows with MovieVerse!
            </p>
          </div>
          <div className="relative w-full flex justify-center items-center my-12 px-4 pb-16 z-100">
            <input
              className="w-4/6 sm:w-3/6 p-4 rounded-l-2xl text-black text-xs sm:text-base"
              type="text"
              name="search"
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for Movies & TV Shows"
            />
            <button
              onClick={handleSearch}
              className="w-2/6 sm:w-1/6 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 text-white text-xs sm:text-base font-bold py-4 px-3 sm:p-4 rounded-r-2xl"
            >
              Search
            </button>
          </div>
        </section>

        <div>
          <div className="w-full flex justify-end items-center mr-8 px-3">
            {/* <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Movies
          </button>
          <button className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-2xl text-sm px-5 py-2.5 text-center mr-2 mb-2">
            TV Shows
          </button> */}
          </div>
          <div>
            {loading ? (
              <div className="min-h-80 flex justify-center items-center py-10">
                <Spinner />
              </div>
            ) : searchResults.length > 0 ? (
              <div>
                <SearchResults searchResults={searchResults} />
              </div>
            ) : (
              <div className="px-4">
                <div>
                  <h1 className="text-2xl font-bold py-1 px-2 mb-6 font-sans">
                    Top Rated Movies
                  </h1>
                  <List movies={topRatedMovies} mediaType="movie" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold py-1 px-2 mb-6 font-sans">
                    Popular Movies
                  </h1>
                  <List movies={popularMovies} mediaType="movie" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold py-1 px-2 mb-6 font-sans">
                    Top Rated TV Shows
                  </h1>
                  <List movies={topRatedTVShows} mediaType="tv" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold py-1 mb-6 font-sans">
                    Popular TV Shows
                  </h1>
                  <List movies={popularTVShows} mediaType="tv" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;



