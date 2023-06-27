import { configAxios } from "./config.js";

export const getAllMovies = async () => {
  try {
    const check = await configAxios.get("movies");
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const getMovie = async (id) => {
  try {
    const check = await configAxios.get(`movies/${id}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const searchMovie = async (obj) => {
  try {
    const check = await configAxios.get(
      `movies/search?name=${obj.name ? obj.name : ""}&type=${
        obj.type ? obj.type : ""
      }&category=${obj.category ? obj.category : ""}`
    );
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

export const updateMovieById = async (id, data) => {
  try {
    const check = await configAxios.patch(`movies/${id}`, data);
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
