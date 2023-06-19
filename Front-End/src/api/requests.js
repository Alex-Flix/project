import { axiosInstance } from "./config";

export const searchForVid = (type, category, name) => {
  return axiosInstance.get("movies/search", {
    params: { type, category, name },
  });
};
