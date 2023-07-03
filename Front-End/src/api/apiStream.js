import Swal from "sweetalert2";
import { axiosInstance, favAxios } from "./config";

export const getAllvideos = ()=>{
  return axiosInstance
    .get("movies")
    .then((res) => res?.data.data)
    .catch((error) => []);
}

export const getAllMovies = ()=>{
  return axiosInstance
    .get("movies/search", {
      params: { type: "movie" },
    })
    .then((res) => res?.data?.data)
    .catch((error) => []);
}
export const getAllSeries = ()=>{
  return axiosInstance
    .get("movies/search", {
      params: { type: "series" },
    })
    .then((res) => res?.data?.data)
    .catch((error) => []);
}
export const getAllAnimes = ()=>{
  return axiosInstance
    .get("movies/search", {
      params: { type: "anime" },
    })
    .then((res) => res.data.data)
    .catch((error) => []);
}


export const searchForVid = (type, category, name) => {
  return axiosInstance.get("movies/search", {
    params: { type, category, name },
  });
};

export const getAllFavorites = ()=>{
 return axiosInstance.get("user/favorites")
 .then((res) => res.data.data)
    .catch((error) => []);
}

export const addToFavorites = (id) => {
 return favAxios.patch("", {
    id,
  });
};
export const deleteFromFavorites = (id) => {
return  favAxios.delete(`${id}`);
};

//error handling
export const PopUpMsg = (error) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: error.message,
  });
};

