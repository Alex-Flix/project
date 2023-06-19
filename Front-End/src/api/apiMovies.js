import { configAxios } from "./config.js";

export const getAllMovies = async () => {
  try {
    const check = await configAxios.get("movies");
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const searchMovie = async (name) => {
  try {
    const check = await configAxios.get(`movies/search?name=${name}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};


export const addNewMovie = async (data) => {
  try {
    const check = await configAxios.post("movies", data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const updateMovieById = async (id,data) => {
  try {
    const check = await configAxios.patch(`movies/${id}`,data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}; 


export const deleteMovieById = async (id) => {
  try {
    const check = await configAxios.delete(`movies/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
}; 
