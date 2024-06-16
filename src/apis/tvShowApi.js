import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getTVShowDetails = async (tvId) => {
  const response = await axios.get(`${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`);
  return response.data;
};

export const getPopularTVShows = async () => {
  const response = await axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
  return response.data.results;
};

export const getTopRatedTVShows = async () => {
  const response = await axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchTVShows = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};
