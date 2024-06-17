import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "videos,credits,similar,recommendations",
    },
  });
  const movie = response.data;
  console.log("movie", movie);
  return movie;
};

export const getPopularMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const getTopRatedMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

export const searchAll = async (query) => {
  try {
    const encodedQuery = encodeURIComponent(query.trim());

    const response = await axios.get(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodedQuery}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error searching:", error);
    throw error;
  }
};
