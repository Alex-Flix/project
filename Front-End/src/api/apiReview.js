import { configAxios } from "./config.js";



export const getAllReviews = async () => {
    try {
      const check = await configAxios.get("reviews");
      if (check?.data) return check.data;
    } catch (error) {
      return error;
    }
  };
  


  export const deleteReview = async (id) => {
    try {
      const check = await configAxios.delete(`review/${id}`);
      if (check?.data) return check.data;
    } catch (error) {
      return error;
    }
  };
  