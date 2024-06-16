import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
export const createRequestToken = async () => {
  const response = await axios.get(
    `${BASE_URL}/authentication/token/new?api_key=${API_KEY}`
  );
  return response.data;
};
export const createSession = async (requestToken) => {
  const response = await axios.post(
    `${BASE_URL}/authentication/session/new?api_key=${API_KEY}`,
    { request_token: requestToken }
  );
  return response.data;
};
