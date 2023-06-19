import { createSlice } from "@reduxjs/toolkit";
const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addToFavorites: (state, action) => {
      state.push(action.payload)
    },
    deleteFromFavorites: (state, action) =>
      (state = state.filter((movie) => movie.id !== action.payload.id)),
    clearFavorites: (state, action) => (state = []),
  },
});

export const { addToFavorites, deleteFromFavorites, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
