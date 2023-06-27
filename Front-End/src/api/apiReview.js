import { storeAxios } from "./config.js";

export const getAllReviews = async () => {
  try {
    const check = await storeAxios.get("reviews");
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const check = await storeAxios.delete(`review/${reviewId}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const check = await storeAxios.get(`reviews/${movieId}`);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const addMovieReview = async (movieId, data) => {
  try {
    const check = await storeAxios.post(`reviews/${movieId}`, data);

    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};

export const updateMovieReview = async (reviewId, data) => {
  try {
    const check = await storeAxios.patch(`review/${reviewId}`, data);
    if (check?.data) return check.data;
  } catch (error) {
    return error;
  }
};
