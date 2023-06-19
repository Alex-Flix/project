import {
  getAllProduct,
  getProductById,
  searchProduct,
} from "../../api/apiEcommerce";

import { createSlice } from "@reduxjs/toolkit";

const initial_State = {
  productList: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initial_State,
  reducers: {
    getAllProducts: async (state, action) => {
      state.productList = action.payload;
      console.log(state.productList);
    },
    getproductById: (state, action) => {},
    searchProductByQuery: (state, action) => {},
  },
});

export const { getAllProducts, getproductById, searchProductByQuery } =
  productSlice.actions;

export default productSlice.reducer;
