import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../api/config";
import {
  getAllAnimes,
  getAllFavorites,
  getAllMovies,
  getAllSeries,
  getAllvideos,
} from "../../api/apiStream";

//create thunks

//1- get all videos
export const fetchAllVids = createAsyncThunk("allVideos", getAllvideos);

//2- get all movies
export const fetchAllMovies = createAsyncThunk("allMovies", getAllMovies);
//3- get all series
export const fetchAllSeries = createAsyncThunk("allSeries", getAllSeries)
  
//4- get all animes
export const fetchAllAnimes = createAsyncThunk("allAnimes", getAllAnimes);

export const getAllFav = createAsyncThunk("allFav", getAllFavorites);

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    movies: [],
    animes: [],
    series: [],
    favorites: [],
  },
  reducers: {
    addToList: (state, action) => {
      console.log(action.payload)
      let newFav = state.favorites
      newFav.push(action.payload)
      state.favorites = newFav  
    },
    removeFromList: (state, action) => {
      state.favorites = [...state.favorites].filter(
        (movie) => movie.id !== action.payload._id
      );
    },
  },
  extraReducers: (builder) => {
    //Handling all videos
    builder.addCase(fetchAllVids.fulfilled, (state, action) => {
      state.movies = action.payload?.filter((vid) => vid.type === "movie")||[];
      state.series = action.payload?.filter((vid) => vid.type === "series")||[];
      state.animes = action.payload?.filter((vid) => vid.type === "anime")||[];
    });

    //Handling movies
    builder.addCase(fetchAllMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    //Handling series
    builder.addCase(fetchAllSeries.fulfilled, (state, action) => {
      state.series = action.payload;
    });
    //Handling animes
    builder.addCase(fetchAllAnimes.fulfilled, (state, action) => {
      state.animes = action.payload;
    });

    builder.addCase(getAllFav.fulfilled, (state, action) => {
      state.favorites = action.payload;
    });
  },
});

export default videosSlice.reducer;
export const { getAnimes, getMovies, getSeries, addToList, removeFromList } =
  videosSlice.actions;
