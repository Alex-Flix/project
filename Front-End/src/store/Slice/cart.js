const { createSlice } = require("@reduxjs/toolkit");

const initial_State = {
  cartList: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cart")) || initial_State,
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      const { _id } = action.payload;
      const productIndex = state.cartList.findIndex((item) => item._id === _id);
      if (productIndex === -1) {
        state.cartList.push(action.payload);
        state.total = state.total + 1;
      } else {
        // update if exists
        state.cartList[productIndex] = action.payload;
      }
      // add to local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      let index = state.cartList.findIndex(
        (item) => item._id === action.payload
      );
      state.cartList?.splice(index, 1);
      state.total = state.total - 1;
      // remove to local storage
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeAllFromCart: (state, action) => {
      state.cartList = [];
      state.total = 0;
      // remove to local storage
      localStorage.removeItem("cart");
    },
    // update quantity using id
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      let index = state.cartList.findIndex((item) => item._id === id);
      state.cartList[index].quantity = quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    toggleProductFromCart: (state, action) => {
      let index = state.cartList.findIndex((p) => p._id === action.payload._id);
      if (index === -1) {
        state.cartList.push(action.payload);
        state.total = state.total + 1;
      } else {
        state.cartList.splice(index, 1);
        state.total = state.total - 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  removeAllFromCart,
  updateQuantity,
  toggleProductFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
