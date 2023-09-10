import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    listCart: [],
    isCartOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.listCart.push(action.payload);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { addToCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;