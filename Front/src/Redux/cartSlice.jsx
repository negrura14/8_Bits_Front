import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    listCart: [],
    isCartOpen: false,
    cartUpdate: false,
  },
  reducers: {
    addToCart: (state, action) => {
      state.listCart = action.payload;
      console.log("SE LLAMO A ESTA FUNCION Y AHORA EL VALOR DE listCart ES: ", state.listCart);
    },
    toggleCart: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    cartUpdate: (state) => {
      state.cartUpdate = !state.cartUpdate;
    }
  },
});

export const { addToCart, toggleCart, cartUpdate } = cartSlice.actions;
export default cartSlice.reducer;