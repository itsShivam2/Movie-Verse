import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const getActorDetails = async (personId) => {
  const response = await axios.get(`${BASE_URL}/person/${personId}?api_key=${API_KEY}`);
  return response.data;
};

export const getPopularPeople = async () => {
  const response = await axios.get(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
  return response.data.results;
};

export const searchPeople = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${query}`);
  return response.data.results;
};
