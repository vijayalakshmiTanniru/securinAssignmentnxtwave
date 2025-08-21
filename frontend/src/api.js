import axios from "axios";

const API_URL = "http://localhost:3001/api";

export const getRecipes = (page = 1, limit = 10) =>
  axios.get(`${API_URL}/recipes?page=${page}&limit=${limit}`);

export const searchRecipes = (params) =>
  axios.get(`${API_URL}/recipes/search`, { params });
