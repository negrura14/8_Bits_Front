import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    listCart: [],
    isCartOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.listCart = action.payload;
      console.log("SE LLAMO A ESTA FUNCION Y AHORA EL VALOR DE listCart ES: ", state.listCart);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const { addToCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer;