import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slice/loader.js";
import productSlice from "./Slice/product";
import cartSlice from "./Slice/cart";
import videosSlice from "./Slice/videosSlice.js";
import favLoaderSlice from "./Slice//favLoader"

export default configureStore({
  reducer: {
    loader: loaderSlice,
    products: productSlice,
    cart: cartSlice,
    videos: videosSlice,
    favLoader:favLoaderSlice
  },
});
