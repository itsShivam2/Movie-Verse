import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovieGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return response.data.genres;
};

export const getTVGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}`);
  return response.data.genres;
};
